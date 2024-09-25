import { http } from "@/utils/http";

export const getModelList = () => {
  return http.request('get', `json/models.json`);
};


export const getDeviceList = () => {
  return http.request('get', `json/device.json`);
};
