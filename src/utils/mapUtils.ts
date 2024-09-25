// 从“MULTILINESTRING”获取经纬度数组
export const getLineArray = (str: string): any => {
  const arr = [];
  str = str.replace(/^MULTILINESTRING\s\(\(/, '').replace(/\)\)$/, '');
  console.log();
  str.split(',').forEach(s => {
    const d = s.split(" ");
    arr.push([parseFloat(d[0]), parseFloat(d[1])]);
  })
  return arr;
};

// 获取折线的中心点
export const getLineCenter = (arr: Array<number>): Array<number> => {
  const points = [];
  arr.forEach(d => {
    points.push(window.turf.point(d));
  });
  const features = window.turf.featureCollection(points);
  const center = window.turf.center(features);
  return center.geometry.coordinates;
};


export const getPolygonCenter = (arr: Array<Array<number>>): Array<number> => {
  const polygon = window.turf.polygon(arr);
  const center = window.turf.centroid(polygon);
  return center.geometry.coordinates;

};