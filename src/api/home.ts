import { http } from "@/utils/http";

export const getLuanGeo = (key: string) => {
  return http.request('get', `static/json/${key}.json`);
};
