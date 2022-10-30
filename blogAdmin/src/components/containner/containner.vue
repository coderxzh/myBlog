<template>
  <div class="containner">
    <div class="top">
      <div class="left">
        <i class="iconfont icon-ego-menu"></i>
        <div>
          <span>首页</span>
          <i class="iconfont icon-xiangyoujiantou" style="font-size: 12px"></i>
          <span>{{ route.meta.title }}</span>
        </div>
      </div>
      <div class="menu" @click="showDrawer = true">
        <i class="iconfont icon-ego-menu"></i>
      </div>
      <div class="right">
        <i class="iconfont icon-fanyi"></i>
        <i class="iconfont icon-quanping"></i>
        <i class="iconfont icon-qingtian rotate" v-show="statuStore.isDark" @click="changeTheme"></i>
        <i class="iconfont icon-yueliang rotate" v-show="!statuStore.isDark" @click="changeTheme"></i>
        <div class="user">
          <img src="https://www.yevpt.com/logo.jpg" />
          <div>
            <span>番茄面警告</span>
            <span>2022-7-3</span>
          </div>
        </div>
        <i class="iconfont icon-shezhi rotate"></i>
      </div>
    </div>
    <div class="middle">
      <NavList></NavList>
    </div>
    <div class="bottom">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router"
import { useStatus } from "@/store/status"
import { storeToRefs } from "pinia"
import NavList from "./items/NavList.vue";
const route = useRoute();
const statuStore = useStatus()
const { showDrawer } = storeToRefs(statuStore)
const changeTheme = () => {
  if (statuStore.isDark) {
    statuStore.isDark = false
    document.documentElement.style.setProperty("--myBackgroudColor", "#fff");
    document.documentElement.style.setProperty("--bodyBackgroudColor", "#f4f4f4");
    document.documentElement.style.setProperty("--myColor", "#4a4a4a");
    document.documentElement.style.setProperty("--pop-bg", "#fff");
  } else {
    statuStore.isDark = true
    document.documentElement.style.setProperty("--myBackgroudColor", "#2d2d2d");
    document.documentElement.style.setProperty("--bodyBackgroudColor", "#000");
    document.documentElement.style.setProperty("--myColor", "#fff");
    document.documentElement.style.setProperty("--pop-bg", "#252526");

  }
}
</script>

<style lang="less" scoped>
.containner {
  @media screen and (max-width:996px) {
    width: calc(~"(100vw - 20px)");
    border-radius: 8px !important;
  }

  display: flex;
  flex-direction: column;
  width: calc(~"(100% - 250px)");
  height: 98%;
  font-size: 15px;
  color: var(--myColor);
  border: none;
  border-radius: 0px 8px 8px 0px;
  overflow: hidden;
  background-color: var(--myBackgroudColor);

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 15px;
    background-color: var(--myBackgroudColor);
    font-size: 13.5px;

    span {
      margin: 0 5px;
    }

    .menu {
      @media screen and (max-width:996px) {
        display: block;
      }

      display: none;

      i {
        padding: 10px;
        border-radius: 5px;

        &:hover {
          background-color: rgba(180, 180, 180, 0.2);
        }
      }
    }

    .left {
      @media screen and (max-width:996px) {
        display: none;
      }

      display: flex;
      align-items: center;
      width: 200px;
      height: 100%;

      span,
      i {
        margin: 0 3px;
      }
    }

    .right {
      display: flex;
      justify-content: end;
      align-items: center;
      width: 320px;
      height: 100%;

      .rotate {
        transition: all 0.5s;
        border-radius: 50%;
      }

      .rotate:hover {
        transform: rotate(100deg);
      }

      i {
        font-size: 20px;
        padding: 8px;
        border-radius: 5px;

        &:hover {
          background-color: rgba(180, 180, 180, 0.2);
        }
      }

      .user {
        display: flex;
        align-items: center;
        margin: 8px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 4px;
        }

        div {
          display: flex;
          flex-direction: column;
          justify-content: center;

          span {
            margin: 1px 5px;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .middle {
    @media screen and (max-width:750px) {
      display: none;
    }

    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    background-color: var(--myBackgroudColor);
    border-top: 1px solid rgba(204, 204, 204, 0.5);

    :deep(.el-tabs) {
      height: 40px !important;
      box-sizing: border-box;
      user-select: none;
    }

    :deep(.is-top) {
      border: none;
    }

    :deep(.el-tabs__item) {
      background-color: #afd4fc;
      color: #fff !important;
      border-radius: 5px;
      margin: 0 5px;
    }

    :deep(.el-tabs__header) {
      height: 45px;
    }
  }

  .bottom {
    position: relative;
    width: 100%;
    height: calc(~"(100vh - 105px)");
    background-color: var(--myBackgroudColor);
    border-top: 1px solid #cccccc80;
    overflow: hidden;
  }
}
</style>
