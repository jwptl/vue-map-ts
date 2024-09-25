// 创建随机id
const createUUID = () => {
  return function b(e) {
    return e ? (e ^ 16 * Math.random() >> e / 4).toString(16) : `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, b);
  }();
};

// 给坐标数据添加高程
const addCoordZ = (coords: any[]) => {
  return coords.map(d => {
    return [d[0], d[1], 0];
  });
};

// 修复polygon数据缺少闭合的问题，去掉相邻重复点
const fixPolygonData = (coords: any[]) => {
  const cLen = coords.length;
  const sCoord = coords[0];
  const eCoord = coords[cLen - 1];
  if (sCoord[0] !== eCoord[0] || sCoord[1] !== eCoord[1]) {
    coords.push([sCoord[0], sCoord[1], sCoord[2] || 0]);
  }
  const fixCoords = [];
  let lastCoord = [];
  coords.forEach(d => {
    if (d[0] !== lastCoord[0] || d[1] !== lastCoord[1]) {
      fixCoords.push([d[0], d[1], d[2] || 0]);
      lastCoord = d;
    }
  });
  return fixCoords;
};

// 创建多边形feature
let polygonIds = [];
const createPolygonFeature = (feature: any, plot?: any) => {
  let _plot = null;
  if (plot) {
    // 防止面拆分时id重复
    plot.pointsData.controlPoints = addCoordZ(feature.geometry.coordinates[0]);
    if (polygonIds.includes(plot.options.identificationCode.id)) {
      plot.options.identificationCode.id = createUUID();
    }
    polygonIds.push(plot.options.identificationCode.id);
    _plot = plot;
  } else {
    _plot = {
      "options": {
        "type": "composed",
        "subType": "polygon",
        "style": {
          "fillColor": "#ff0000",
          "fillOpacity": 0.6,
          "fillVisible": true,
          "allowPick": true,
          "displayMode": "altitude",
          "animations": [],
          "customerMessage": { "type": "polygon" },
          "fillDrawType": "polygonPrimitive",
          "fillDepthTest": false,
          "fillShowType": "fillDefaultColor",
          "fillTextureUrl": "static/plot/fill/1.png",
          "radarScanSpeed": 1,
          "radarScanColor": "#ff0000",
          "radarScanOpacity": 1,
          "diffusingRingSpeed": 1,
          "diffusingRingOpacity": 1,
          "diffusingRingColor": "#ff0000",
          "strokeWidth": 2,
          "strokeColor": "#000000",
          "strokeOpacity": 1,
          "strokeVisible": true,
          "lineDrawType": "linePrimitive",
          "strokeDepthTest": false,
          "strokeShowType": "strokeDefaultColor",
          "fontSize": 16,
          "fontFamily": "宋体",
          "fontWeight": "normal",
          "backgroundColor": "#475AFF",
          "backgroundOpacity": 0,
          "color": "#0019ff",
          "textStrokeColor": "#475AFF",
          "imgOpacity": 1,
          "width": 60,
          "height": 60,
          "textStrokeWidth": 0,
          "text": "新增的区域",
          "anchor": "top",
          "pointUrl": "",
          "pointVisible": true,
          "fontStyle": "normal",
          "pointDrawType": "billboard",
          "altitude": 0,
          "opacity": 1,
          "pointDepthTest": false,
          "originalHeight": 60,
          "originalWidth": 60,
          "scale": [1, 1]
        },
        "identificationCode": {
          "type": "composed",
          "subType": "polygon",
          "id": createUUID()
        }
      },
      "pointsData": {
        "cartesian": [],
        "cartographic": [],
        "controlPoints": addCoordZ(feature.geometry.coordinates[0]),
        "modifyPoints": []
      }
    };
  }
  return _plot;
};

// 创建点feature
const createPointFeature = (feature: any, plot?: any) => {
  const _plot = plot || {
    "options": {
      "type": "point",
      "subType": "simple",
      "style": {
        "fontSize": 16,
        "fontFamily": "宋体",
        "fontWeight": "normal",
        "backgroundColor": "#475AFF",
        "backgroundOpacity": 0,
        "color": "#0019ff",
        "textStrokeColor": "#475AFF",
        "imgOpacity": 1,
        "width": 60,
        "height": 60,
        "textStrokeWidth": 0,
        "text": "新增的点",
        "anchor": "top",
        "allowPick": true,
        "pointUrl": "static/plot/point/16.png",
        "pointVisible": true,
        "customerMessage": { "type": "icon" },
        "fontStyle": "normal",
        "pointDrawType": "billboard",
        "displayMode": "altitude",
        "altitude": 0,
        "opacity": 1,
        "pointDepthTest": false,
        "animations": [],
        "originalHeight": 60,
        "originalWidth": 60,
        "scale": [1, 1]
      },
      "identificationCode": {
        "type": "point",
        "subType": "simple",
        "id": createUUID()
      }
    },
    "pointsData": {
      "cartesian": [],
      "cartographic": [],
      "controlPoints": [],
      "modifyPoints": []
    }
  };
  _plot.pointsData.cartographic = addCoordZ([feature.geometry.coordinates]);
  _plot.pointsData.controlPoints = addCoordZ([feature.geometry.coordinates]);
  return _plot;
};

// 创建plot-feature
const createPlotFeature = (feature: any, plot?: any) => {
  if (feature.geometry.type === 'Point') {
    return createPointFeature(feature, plot);
  } else if (feature.geometry.type === 'Polygon') {
    return createPolygonFeature(feature, plot);
  }
};

// 将标绘数据转换为GeoJson格式数据
export const plotToGeo = (data: any, isExport?: boolean): any => {
  const geo = {
    "type": "FeatureCollection",
    "features": []
  };
  data.features.forEach((feature: any) => {
    const item = {
      "type": "Feature",
      "properties": {
        "title": ''
      },
      "geometry": {
        "coordinates": null,
        "type": ""
      },
      "plot": isExport ? JSON.stringify(feature) : feature
    };
    if (feature.options.type === "point" || feature.options.subType === "point") {
      item.properties.title = feature.options.style.text;
      item.geometry.coordinates = feature.pointsData.controlPoints[0];
      item.geometry.type = "Point"
    } else if (feature.options.type === "polygon" || feature.options.subType === "polygon") {
      item.properties.title = feature.options.style.text;
      item.geometry.coordinates = [fixPolygonData(feature.pointsData.controlPoints)];
      item.geometry.type = "Polygon"
    }
    geo.features.push(item);
  })
  return geo;
};

// 将GeoJson格式数据转换为标绘数据
export const GeoToPlot = (data: any): any => {
  polygonIds = [];
  const plot = {
    "features": []
  };
  data.features.forEach((feature: any) => {
    if (feature.plot) {
      if (typeof feature.plot === 'string') {
        plot.features.push(JSON.parse(feature.plot));
      } else {
        plot.features.push(createPlotFeature(feature, feature.plot));
      }
    } else {
      plot.features.push(createPlotFeature(feature));
    }
  })
  return plot;
};
