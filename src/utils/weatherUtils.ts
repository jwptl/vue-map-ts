import Sun from "@iconify-icons/ri/sun-line";
import Cloud from "@iconify-icons/ri/cloudy-line";
import Cloud2 from "@iconify-icons/ri/sun-cloudy-line";
import Rain from "@iconify-icons/ri/drizzle-line";
import Rain2 from "@iconify-icons/ri/heavy-showers-line";
import Snow from "@iconify-icons/ri/snowy-line";
import Snow2 from "@iconify-icons/ri/hail-line";
import Dust from "@iconify-icons/ri/sun-foggy-line";
import Fog from "@iconify-icons/ri/mist-line";
import Haze from "@iconify-icons/ri/haze-2-line";
import Wind from "@iconify-icons/ri/windy-line";
import Tornado from "@iconify-icons/ri/tornado-line";
import Cold from "@iconify-icons/ri/temp-cold-line";
import Hot from "@iconify-icons/ri/temp-hot-line";
import Dry from "@iconify-icons/ri/blaze-line";
import Bolt from "@iconify-icons/ri/flashlight-line";
import Zero from "@iconify-icons/ri/celsius-line";

// 天气类型与图标映射
export const weatherMap = {
  "0": Sun, // 晴-晴（国内城市白天晴）
  "1": Sun, // 晴-晴（国内城市夜晚晴）
  "4": Cloud2, // 云-多云
  "5": Cloud2, // 云-晴间多云
  "6": Cloud2, // 云-晴间多云
  "7": Cloud2, // 云-大部多云
  "8": Cloud2, // 云-大部多云
  "9": Cloud, // 云-阴
  "10": Rain, // 雨-阵雨
  "11": Rain, // 雨-雷阵雨
  "12": Rain, // 雨-雷阵雨伴有冰雹
  "13": Rain, // 雨-小雨
  "14": Rain, // 雨-中雨
  "15": Rain2, // 雨-大雨
  "16": Rain2, // 雨-暴雨
  "17": Rain2, // 雨-大暴雨
  "18": Rain2, // 雨-特大暴雨
  "19": Rain, // 雨-冻雨
  "20": Snow, // 雪-雨夹雪
  "21": Snow, // 雪-阵雪
  "22": Snow, // 雪-小雪
  "23": Snow, // 雪-中雪
  "24": Snow2, // 雪-大雪
  "25": Snow2, // 雪-暴雪
  "26": Dust, // 尘-浮尘
  "27": Dust, // 尘-扬沙
  "28": Dust, // 尘-沙尘暴
  "29": Dust, // 尘-强沙尘暴
  "30": Fog, // 雾-雾
  "31": Haze, // 霾-霾
  "32": Wind, // 风-风
  "33": Wind, // 风-大风
  "36": Tornado // 龙卷风-龙卷风
};

// 预警类型与图标映射
export const alarmMap = {
  "01": Tornado, // 台风-龙卷风
  "02": Rain2, // 暴雨
  "03": Snow, // 暴雪
  "04": Cold, // 寒潮
  "05": Wind, // 大风
  "06": Dust, // 沙尘暴
  "07": Hot, // 高温
  "08": Dry, // 干旱
  "09": Bolt, // 雷电
  "10": Snow2, // 冰雹
  "11": Zero, // 霜冻
  "12": Fog, // 大雾
  "13": Haze, // 霾
  "14": Zero // 道路结冰
};
