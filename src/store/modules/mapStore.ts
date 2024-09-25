import { store } from "@/store";
import { mapType } from "./types";
import { defineStore } from "pinia";

export const mapStore = defineStore({
  id: "map-store-hook",
  state: (): mapType => ({
    isMapLoaded: false,
    drawData: null
  }),
  actions: {
    setMapState(isMapLoaded: boolean) {
      this.isMapLoaded = isMapLoaded;
    },
    setDrawData(data: object) {
      this.drawData = data;
    }
  }
});

export function mapStoreHook() {
  return mapStore(store);
}
