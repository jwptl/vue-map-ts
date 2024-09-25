<script setup lang="ts">
import {ref, onMounted, watch} from "vue";
import {useMap} from "@/hooks/useMap";
import {getDeviceList, getModelList} from "@/api/model";


const containerId = ref(null);
const mapRef = ref(null);


const addImagelist = () => {
  const list = [
    "G_TYPE_102", "G_TYPE_103", "G_TYPE_111", "G_TYPE_112", "G_TYPE_113", "G_TYPE_115", "G_TYPE_116", "G_TYPE_117",
    "G_TYPE_118", "G_TYPE_119", "G_TYPE_120", "G_TYPE_204", "G_TYPE_209", "G_TYPE_303", "G_TYPE_311", "G_TYPE_312",
    "G_TYPE_313", "G_TYPE_411", "G_TYPE_416", "icon-flag1", "G_TYPE_112-1", "G_TYPE_113-2"
  ];
  console.log(mapRef.value.loadImage)
  list.forEach(element => {

    mapRef.value.loadImage(`./icon/${element}.png`, function (error, image) {
      if (error) throw error;
      mapRef.value.addImage(element, image);
    });
  });
};

/** 添加栅格图 */
const addImagery = () => {
  mapRef.value.addSource("IMAGERY_SOURCE", {
    type: "raster", //数据源类型：栅格数据源
     tiles: ["https://services.minedata.cn/service/data/satellite?x={x}&y={y}&z={z}"], //瓦片服务地址
    //tiles: ["https://t1.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=d083e4cf30bfc438ef93436c10c2c20a"], //瓦片服务地址
    tileSize: 256, //瓦片尺寸
    ignoreMissingTiles: true,
    maxzoom: 15,
  });
  mapRef.value.addLayer({
    id: "IMAGERY",
    type: "raster", //图层类型为"raster"
    source: "IMAGERY_SOURCE",
    minzoom: 1,
    maxzoom: 23,
  });
}

const modelMap = {};
const init3DModel = ()=>{
  getModelList().then(res => {
    (res.data || []).forEach(d => {
      modelMap[d.id] = d;
    })
  });
}

/** 添加莫模型*/
const addModel = (model)=>{
  let modelPath = model.path;
  const modelScene = mapRef.value.addSceneComponent({
    id: model.id,
    type: "3d-model",
    data: modelPath,
    modelFolder: "./gltf/", // 该数据引用图片等资源的文件夹路径
    scale: model.scale || [1, 1, 1], // 在xyz轴方向上的缩放比例
    rotation: model.rotation || [0, 0, 0], // 绕xyz轴方向上的旋转，单位为度
    position: new window.minemap.Math.Vector3([model.longitude, model.latitude, model.altitude]), // 锚点（模型局部坐标原点）的经纬度位置
    loaded: () => {
    }
  });
}

const buildJsondata = data => {
  const jsonData = {
    type: "FeatureCollection",
    features: []
  };
  data.forEach(d => {
    jsonData.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [d.longitude, d.latitude],
      },
      properties: {
        title: d.deviceName,
        deviceId: d.deviceId,
        icon: d.deviceType + (d.status === '0' ? '' : `-${d.status}`)
      }
    });
  });
  return jsonData;
};

const addDeviceLayer=(datalist)=>{
  let jsonData = buildJsondata(datalist);
  mapRef.value.addSource("pointSource", {
    type: "geojson",
    data: jsonData,
  });
  mapRef.value.addLayer({
    id: "symbolLayer",
    type: "symbol",
    source: "pointSource",
    layout: {
      "icon-image": "{icon}",
      "text-field": "{title}",
      "text-size": 12,
      "visibility": "visible",
      "icon-pitch-alignment": "viewport",
      "text-pitch-alignment": "viewport",
      "icon-anchor": "bottom",
      "icon-size": 0.5,
      "text-offset": [0, 0.6],
      "icon-offset": [0, -12],
      "text-max-width": 8
    },
    paint: {
      "icon-color": "#ff0000",
      "text-color": "#fff"
    },
    minzoom: 10,
    maxzoom: 21,
    classificationType: window.minemap.ClassificationType.FORCE_VECTOR_OVER_MODEL
  });
}

const getDevice = ()=>{
  getDeviceList().then(res=>{
    addDeviceLayer(res.data?.rows || []);
  })
}

const onMouseClick=(e)=>{
  const features = mapRef.value.queryRenderedFeatures(e.point, { layers: ["symbolLayer"] });
  if (!features.length) return;
  const feature = features[0];
  const viewAngle = { zoom: 20, pitch: 66, bearing: 0 ,center:[108.93743618, 22.44461526]};
  mapRef.value.flyTo(viewAngle);
}

const localTilesetUrl = new URL('/loop/tileset.json', import.meta.url).href;
console.log(localTilesetUrl)

onMounted(() => {
  init3DModel();
  const {map} = useMap({
    containerId: containerId.value,
    center: [119.72375773437578, 29.166067011618726, 291.99738575681795],
    zoom:15.5,
    maxZoom: 21, /*地图最大缩放等级*/
    minZoom: 3,  /*地图最小缩放等级*/
    pitch:0,
  });
  mapRef.value = map.value;
  map.value.on('load', function() {
    addImagelist()
    addImagery()
    //(modelMap['model_mdsn'])
    setTimeout(() => {
      getDevice()
    }, 500);
    map.value.addSceneComponent({
      id: 'serve',
      type: "3d-tiles",
      url: './20155235/tileset.json', // 要加载的数据
      translation: new minemap.Math.Vector3(0, 0,-50),
      // show: true,
      // skipLevelOfDetail: true, //跨层调度
      // maximumScreenSpaceError: 8,
      // useMipmap: true, //提升模型渲染质量，损失性能，3d-tiles 默认为 false
      // opacity: 0.9, // 透明度 0-1
      minzoom: 13,
      maxzoom: 19,
      sourceLoaded: (config) => {
        console.log(config._geoCenters[0]);
      },
    });
  })
})

</script>

<template>
  <div class="w-full h-full">
    <div ref="containerId" id="map_container" class="w-full h-full">
    </div>
  </div>
</template>

<style lang="scss">
.switch-box{
  position: absolute;
  bottom:20px;
  right: 20px;
  z-index: 9999;
}
</style>
