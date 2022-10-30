<template>
  <div class="silder">
    <div @click="save">
      <i class="iconfont icon-shoucang" style="color: #ffba15"></i>
      <span>保存文章</span>
    </div>
    <div>
      <i class="iconfont icon-shanchu"></i>
      <span>清除文章</span>
    </div>
    <div @click="upload">
      <i class="iconfont icon-upload"></i><span>上传文章</span>
    </div>
    <div><i class="iconfont icon-shouye"></i><span>返回首页</span></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import mitt from "../../utils/mitt";
let save = () => {
  mitt.emit("save", "mypage");
};
let upload = () => {
  mitt.emit("show", true);
};
let timer: any;

mitt.on("callback", (success) => {
  if (success) {
    if (timer) {
      return;
    } else {
      timer = setTimeout(() => {
        ElMessage({
          showClose: true,
          message: "保存成功",
          type: "success",
          center: true,
        });
        timer = null;
      }, 500);
    }
  }
});
</script>

<style lang="less" scoped>
.silder {
  box-sizing: border-box;
  position: absolute;
  right: 20px;
  top: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 250px;
  padding: 15px 5px;
  background-color: var(--bodyBackgroudColor);
  box-shadow: var(--myShadow);
  border-radius: 5px;
  transform: translateY(-50%);
  transition: 0.3s;
  user-select: none;
  cursor: context-menu;
  z-index: 99;

  &:hover {
    width: 139px;
  }

  &:hover span {
    opacity: 1;
  }

  div {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    margin: 5px 0;
    overflow: hidden;
    border-radius: 5px;

    &:hover {
      background-color: rgba(204, 204, 204, 0.3);
    }

    i {
      position: absolute;
      left: 15px;
    }

    span {
      position: relative;
      left: 45px;
      opacity: 0;
      transition: 0.3s;
      word-break: keep-all;
      /* 不换行 */
      white-space: nowrap;
    }
  }
}
</style>
