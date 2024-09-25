import proj4 from "proj4";

// 定义一些常量,坐标转化用
const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;
  
// 转换维度
const transformLat = (lng: number, lat: number) => {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret;
};
// 转换经度
const transformLng = (lng: number, lat: number) => {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret;
};
// 计算偏移后的经纬度坐标值
const delta = (lng: number, lat: number) : number[] => {
  let dlat = transformLat(lng - 105.0, lat - 35.0);
  let dlng = transformLng(lng - 105.0, lat - 35.0);
  const radlat = lat / 180.0 * PI;
  let magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  const sqrtmagic = Math.sqrt(magic);
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
  const mglat = parseFloat(lat) + parseFloat(dlat);
  const mglng = parseFloat(lng) + parseFloat(dlng);
  return [mglng, mglat];
};

// 将WGS84坐标转换为GCJ02坐标
export const wgs84ToGcj02 = (lng: number, lat: number) : number[] => {
  return [...delta(lng, lat)];
};

// 将GCJ02坐标转换为WGS84坐标
export const gcj02ToWgs84 = (lng: number, lat: number) : number[] => {
  const dLngLat = delta(lng, lat);
  return [lng * 2 - dLngLat[0], lat * 2 - dLngLat[1]];
};

// 将WGS84坐标转换为高斯克吕格投影坐标【4236 --> 4548】
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs +type=crs');
proj4.defs('EPSG:4548', '+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs +type=crs');
export const wgs84ToProj = (lng: number, lat: number): number[] => {
  return proj4('EPSG:4326', 'EPSG:4548', [lng, lat]);
};