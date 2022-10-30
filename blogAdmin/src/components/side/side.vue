<template>
  <div class="side">
    <ul>
      <div class="title">
        <img src="../../assets/logo.png" alt="" />
        <span>BlogAdmin</span>
      </div>
      <router-link to="/home">
        <i class="iconfont icon-diannao"></i><span>首页</span>
      </router-link>
      <a @click="visiable = !visiable"><i class="iconfont icon-xiepinglun"></i><span>文章管理</span></a>
      <transition name="fade">
        <div class="visiable" v-show="visiable">
          <router-link to="/addEssay">
            <span>文章编写</span>
          </router-link>
          <router-link to="/essayList">
            <span>文章列表</span>
          </router-link>
          <router-link to="/editEssay">
            <span>编辑文章</span>
          </router-link>
        </div>
      </transition>
      <router-link to="/link"><i class="iconfont icon-lianjie"></i><span>友链管理</span></router-link>
      <a><i class="iconfont icon-yonghu1"></i><span>用户管理</span></a>
      <a><i class="iconfont icon-bianqian"></i><span>个人笔记</span></a>
      <a><i class="iconfont icon-jinggao2"></i><span>错误页面</span></a>
      <a><i class="iconfont icon-hulianwang"></i><span>国际化</span></a>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import "animate.css";
const visiable = ref(false);
</script>

<style lang="less" scoped>
.fade-enter-from,
.fade-leave-to {
  height: 0 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-to,
.fade-leave-from {
  height: 159px !important;
}

.side {
  @media screen and (max-width:996px) {
    display: none;
  }

  height: 98%;
  width: 230px;
  box-sizing: border-box;
  padding: 20px;
  background-color: var(--myBackgroudColor);
  border-right: 1px solid rgba(204, 204, 204, 0.3);
  border-radius: 8px 0 0 8px;
  font-size: 18px;
  color: var(--myColor);
  user-select: none;

  ul {
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;

      span {
        font-size: 18px;
        font-weight: bold;
      }

      img {
        width: 60px;
        height: 60px;
      }
    }

    .visiable {
      overflow: hidden;
      height: 159px;
      transition: all 0.3s;

      a {
        padding: 0 30px;
      }
    }

    a {
      display: block;
      display: flex;
      align-items: center;
      height: 45px;
      text-decoration: none;
      color: var(--myColor);
      margin: 6px 0;
      border-radius: 5px;
      padding: 0 10px;

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }

      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
