import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);
const dataMap = new Map(); // 保存新增的不同类型车辆的轨迹数据

// 添加车辆轨迹数据
const setModelData = (key: string, track: any) => {
  const trackId = `track_${track.id}`;
  const dataObj = dataMap.get(key);
  dataObj.trackIds.push(trackId);
  const step = [0];
  const position = [];
  const rotation = [];
  position.push(...[track.lon, track.lat, 0]);
  if (track.angle < 90) {
    track.angle = - 90 - track.angle;
  } else {
    track.angle =  270 - track.angle
  }
  rotation.push(...[0, 0, track.angle]);
  dataObj.steps.push(step);
  dataObj.positions.push(position);
  dataObj.rotations.push(rotation);
};

// 清空车辆的轨迹数据
const clearModelData = () => {
  for (let item of dataMap.values()) {
    item.trackIds = [];
    item.positions = [];
    item.rotations = [];
    item.steps = [];
  }
};
	
// 添加车辆动画效果
const modelAnimation = (modelId: string, obj: any) => {
  const nTime = dayjs(new Date()).utc().local().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  window.map.animationManager.add({
    id: modelId,
    type: "modelInstance",
    reference: "none",
    trackIds: obj.trackIds,
    positions: obj.positions,
    rotations: obj.rotations,
    times: {
      "start": nTime,
      "end": nTime,
      "steps": obj.steps
    },
    loop: "once",
    autoPlay: !0
  });
};

// 清空上图车辆
export const clearTrack = () => {
  clearModelData();
  window.map.animationManager.removeAll();
}
	
// 车辆轨迹模型上图
// 车辆类型：1.轿车；2.SUV；3.公交车；4.卡车
// 车辆颜色：1.红色；2.黄色；3.绿色
export const addTrackModel = (tracks: any[]) => {
  // 清空上图车辆
  clearTrack();
  // 转换车辆轨迹数据
  tracks.forEach(track => {
    const modeType = `${track.vehicleType}_${track.vehicleColor}`;
    const modelId = `MODEL_${modeType}`;
    if (!window.map.getSceneComponent(modelId)) {
      window.map.addSceneComponent({
        id: modelId,
        type: "3d-model",
        data: `static/models/${modeType}.glb`,
        modelFolder: "static/models/",
        scale: [1, 1, 1],
        position: [0, 0, 0],
        rotation: [0, 90, 90],
        allowPick: !1
      });
      dataMap.set(modelId, {
        trackIds: [],
        positions: [],
        rotations: [],
        steps: []
      });
    }
    setModelData(modelId, track);
  });
  // 添加车辆模型轨迹动画效果
  dataMap.forEach((item, key) => {
    if (item.trackIds.length > 0) {
      modelAnimation(key, item);
    }
  });
};

// 删除车辆模型
export const removeTrackModel = () => {
  clearTrack();
  [...dataMap.keys()].forEach(id => {
    window.map.removeSceneComponent(id);
  });
  dataMap.clear();
};
