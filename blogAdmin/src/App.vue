<template>
  <div class="root">
    <side></side>
    <containner></containner>
    <popBoxVue></popBoxVue>
    <Drawer></Drawer>
  </div>
</template>

<script lang="ts" setup>
import side from "./components/side/side.vue";
import containner from "./components/containner/containner.vue";
import popBoxVue from "./components/commen/popBox.vue";
import Drawer from "./components/commen/Drawer.vue";
</script>
<style lang="less">
:root {
  /* 元素背景色 */
  --myBackgroudColor: #fff;
  /* body背景色 */
  --bodyBackgroudColor: #f4f4f4;
  /* 背景的阴影 */
  --myShadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  /* 字体颜色 */
  --myColor: #4a4a4a;
  --pop-bg: #fff;
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 6px;
  background-color: var(--bodyBackgroudColor);
}

::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 5px;
}

body {
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 16px;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bodyBackgroudColor);

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }
}

.root {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0px 10px;
}

.md-toolbar {
  flex-wrap: wrap !important;
}

.active {
  color: #409eff !important;
}
</style>
