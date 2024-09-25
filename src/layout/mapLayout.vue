<script setup lang="ts">
import MapContainer from "@/components/MapContainer/index.vue";

</script>

<template>
  <div class="absolute top-0 left-0 w-screen h-screen overflow-hidden">
    <router-view></router-view>
    <MapContainer class="absolute top-0 left-0 re-map" />
  </div>
</template>

<style lang="scss">
.map-bg {
  box-shadow: 0 0 240px 24px #041128 inset;
}

.re-map canvas {
  outline: none;
}
</style>
