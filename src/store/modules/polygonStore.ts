import { defineStore } from "pinia";
import { store } from "@/store";
import { ref } from "vue";

export const usePolygonStore = defineStore('polygonStore', () => {
    const polygonStyleList = ref([])
    const centerList = ref([])
    const polygonList = ref([])

    const setPolygonStyle = (obj) => {
        polygonStyleList.value.push(obj)
        polygonList.value.push(obj)
    }

    const setPolygonAll = (obj) => {
        polygonList.value.push(obj)
    }

    const editPolygonStyle = (id, fillStyle, textStyle) => {
        const index = polygonStyleList.value.findIndex(item => item.id === id);
        if (index !== -1) {
            // 创建一个新的fillStyle对象，以避免直接修改原有的对象
            polygonStyleList.value[index].fillStyle = fillStyle;
            polygonStyleList.value[index].textStyle = textStyle;
        }
    }

    const deletePolygonStyle = (id) => {
        const index = polygonStyleList.value.findIndex(item => item.id === id)
        polygonStyleList.value.splice(index, 1)
    }

    const setCenter = (obj)=>{
        centerList.value.push(obj)
    }

    const editCenter = (id,obj)=>{
        const index = centerList.value.findIndex(item => item.id === id);
        if(index!==-1){
            centerList.value[index].center = obj
        }
    }

    const deleteCenter = (id)=>{
        const index = centerList.value.findIndex(item => item.id === id);
        if(index!==-1){
            centerList.value.splice(index, 1)
        }
    }

    return {
        polygonStyleList,
        centerList,
        polygonList,
        setPolygonAll,
        setPolygonStyle,
        editPolygonStyle,
        deletePolygonStyle,
        setCenter,
        editCenter,
        deleteCenter
    }
})
