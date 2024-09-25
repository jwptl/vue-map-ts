<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const menuList = ref([
  { label: "基础", key: "edit", isChecked: false },
  { label: "高级", key: "plot", isChecked: false }
]);
const checkMenuByKey = (key: string) => {
  menuList.value.map(menu => {
    menu.isChecked = false;
    if (key === menu.key) {
      menu.isChecked = true;
    }
  });
};
watch(
  () => router.currentRoute.value.path,
  (path: string) => {
    const key = path.split("/").pop();
    checkMenuByKey(key);
  },
  { immediate: true }
);
const clickMenu = (key: string) => {
  router.push({ path: `/map/${key}` });
};
</script>

<template>
  <div class="top-header">
    <div class="menu-item"
      v-for="item, index in menuList"
      :key="item.key"
      :class="[{ selected: item.isChecked, 'menu-item-left': index === 0, 'menu-item-right': index === menuList.length - 1 }]"
      @click.native="clickMenu(item.key)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-header {
  position: absolute;
  width: 201px;
  height: 36px;
  top: 4px;
  left: 50%;
  z-index: 3;
  margin-left: -100px;
  display: flex;
  .menu-item {
    width: 100px;
    height: 36px;
    line-height: 38px;
    font-size: 14px;
    text-align: center;
    font-family: PangMenZhengDao;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.8);
    opacity: 0.6;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
    &.selected {
      opacity: 1;
      color: #daebff;
    }
  }
  .menu-item-left {
    padding-left: 32px;
    background: linear-gradient(to right, rgba(56, 159, 246, 0.2),rgba(24, 31, 33, 1));
    clip-path: polygon(0 0, 100% 0, 100% 100%, 40% 100%);
    
  }
  .menu-item-right {
    margin-left: 1px;
    padding-right: 32px;
    background: linear-gradient(to left, rgba(56, 159, 246, 0.2), rgba(24, 31, 33, 1));
    clip-path: polygon(0 0, 100% 0, 60% 100%, 0 100%);
  }
}
</style>
