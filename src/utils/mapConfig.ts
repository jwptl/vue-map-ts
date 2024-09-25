const mapBseUrl = 'https://minemap.minedata.cn'; // minedata(以下涉及此地址均需要更改)
const mapServiceUrl = 'https://sd-data.minedata.cn'; // minedata(以下涉及此地址均需要更改)
const mapConfig = {
  MAP: {
    SOLUTION: '1280832635776028672',
    KEY: '43fbb22ddf75496290c9563e8cd2f3c0',
    DOMAIN_ROOT: mapBseUrl,
    DATA_DOMAIN_ROOT: mapBseUrl,
    SERVER_DOMAIN_ROOT: mapServiceUrl,
    MINE_SERVICE_ROOT: mapServiceUrl,
    MINEMAP_2D_API_URL: `${mapBseUrl}/minemapapi/v2.1.1/sprite/sprite`,
    MINEMAP_3D_API_URL: `${mapBseUrl}/minemapapi/v4.0.0/sprite/sprite`,
    FONT_URL: `${mapBseUrl}/minemapapi/v3.2.0/fonts`,
    MAP_CDN: `${mapBseUrl}/minemapapi/minemap-CDN`,
    MAP_STYLE_URL: `map/solu/style`, //mineDataS15以下、Minedata@earth(NCE): service/solu/style/id、map/solu/style
    CENTER: [116.30309232621251, 31.810508955914862],
    ZOOM: 7.7,
    PITCH: 0,
    BEARING: 0,
    MAXZOOM: 19.4,
    MINZOOM: 3,
    PROJECTION: 'MERCATOR',  //经纬度投影：LATLON，墨卡托投影：MERCATOR
    ROAMING: false //球体是否漫游
  },
  MAP_YX: { // 卫星影像地图配置
    // url: 'http://219.138.181.33:18101/service/map/wmts-satellite?service=WMTS&version=1.0.0&request=GetTile&layer=default&format=image/jpg&style=default&tilematrixset=3857&tilematrix={z}&tilecol={x}&tilerow={y}&key=cb163b63e5aa471499594e96dbf2812e',
    url: 'https://services.minedata.cn/service/data/satellite?x={x}&y={y}&z={z}',
    tileSize: 256
  },
  MAP_LIST: [ //地图配图方案列表
    {
      name: '标准地图',
      key: '1108ecb23bf34e92916a211fb5323342',
      solution: '1218191899380228096'
    },
    {
      name: '大屏地图',
      key: '1108ecb23bf34e92916a211fb5323342',
      solution: '1211614573674700800'
    }
  ]
};

export {
  mapConfig
}

