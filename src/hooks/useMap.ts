import {ref, onMounted, onUnmounted} from 'vue';
import {mapConfig} from "@/utils/mapConfig";

const mapCfg = mapConfig.MAP;

window.minemap.domainUrl = mapCfg.DOMAIN_ROOT;
window.minemap.dataDomainUrl = mapCfg.DATA_DOMAIN_ROOT;
window.minemap.serverDomainUrl = mapCfg.SERVER_DOMAIN_ROOT;
window.minemap.serviceUrl = `${mapCfg.MINE_SERVICE_ROOT}/service`;
window.minemap.appKey = mapCfg.KEY;
window.minemap.solution = mapCfg.SOLUTION;

export const useMap = (options = {}) => {
  const map = ref(null);
  const mapContainerId = options.containerId || 'map'; // Default containerId

  const initMap = () => {
    window.minemap.spriteUrl = mapCfg.MINEMAP_3D_API_URL;
    window.minemap.fontsUrl = mapCfg.FONT_URL;
    window.minemapCDN = mapCfg.MAP_CDN;

    const mapOptions = {
      container: mapContainerId,
      //style:'https://service.minedata.cn/map/solu/style/11001',
      style:{
        "glyphs": "minemap://fonts/{fontstack}/{range}",
        "sprite": "minemap://sprite/sprite",
        "sources": {},
        "layers": [],
        "version": 8
      },
      center: [0, 0],
      zoom: 0,
      pitch: options.pitch || mapCfg.PITCH || 0,
      bearing: options.bearing || mapCfg.BEARING || 0,
      maxZoom: options.maxZoom || mapCfg.MAXZOOM || 19,
      minZoom: options.minZoom || mapCfg.MINZOOM || 3,
      projection: options.projection || mapCfg.PROJECTION || 'MERCATOR',
      boxZoom: true,
      logoControl: true,
    };

    if (!mapCfg.ROAMING) {
      mapOptions.center = options.center || mapCfg.CENTER;
      mapOptions.zoom = options.zoom || mapCfg.ZOOM;
    }

    map.value = new window.minemap.Map(mapOptions);
  };
  initMap();
  return {map};
}
