<template>
  <div class="root">
    <!-- 侧边栏 -->
    <div class="side">
      <div class="top">
        <img
          src="https://cdn.jsdelivr.net/gh/coderxzh/PicGoImg/img/user.jpg"
          alt=""
        />
        <p>coderHui</p>
      </div>
      <div class="nav">
        <router-link to="/backend/index"
          ><div class="hover">
            <i class="el-icon-user-solid"></i>主页
          </div></router-link
        >
        <router-link to="/backend/index"
          ><div @click="show3 = !show3" class="hover">
            <i class="el-icon-s-promotion"></i>文章
          </div></router-link
        >
        <el-collapse-transition>
          <div v-show="show3" class="drop">
            <router-link to="/backend/allarticle"
              ><div><i class="el-icon-paperclip"></i>所有文章</div></router-link
            >
            <router-link to="/backend/upload"
              ><div><i class="el-icon-paperclip"></i>写文章</div></router-link
            >
            <router-link to="/backend/articleEditor"
              ><div><i class="el-icon-paperclip"></i>文章编辑</div></router-link
            >
          </div>
        </el-collapse-transition>
        <router-link to="/backend/index"
          ><div class="hover">
            <i class="el-icon-chat-dot-round"></i>评论
          </div></router-link
        >
        <router-link to="/backend/index"
          ><div class="hover">
            <i class="el-icon-collection-tag"></i>分类
          </div></router-link
        >
        <router-link to="/backend/uploadphoto"
          ><div class="hover">
            <i class="el-icon-tickets"></i>管理
          </div></router-link
        >
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show3: false,
  }),
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("tooken")) {
      next();
    } else {
      next("/login");
    }
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.root {
  width: 1920px;
  height: 961px;
  box-sizing: border-box;
}
.side {
  height: 961px;
  width: 200px;
  float: left;
  background-color: rgb(25, 111, 133);
  color: #fff;
  font-size: 16px;
}
.side .top {
  position: relative;
  height: 200px;
  background-color: rgb(25, 111, 133);
}
.side .top img {
  display: block;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  border-radius: 50%;
  overflow: hidden;
}
.side .top p {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.nav > a {
  width: 100%;
  height: 35px;
  text-indent: 12%;
  line-height: 35px;
}
.nav a {
  list-style: none;
  text-decoration: none;
  color: #fff;
}
.nav a :hover {
  color: #fff;
}
.nav i {
  padding: 0 12px;
}
.drop a {
  height: 35px;
  line-height: 35px;
  text-indent: 14% !important;
}
.nav .hover:hover {
  background-color: rgb(14, 78, 93);
}
.nav .drop {
  height: 105px;
}
.nav .drop div:hover {
  background-color: rgb(14, 78, 93);
}
.nav .drop div {
  width: 100%;
  height: 35px;
}
.main {
  box-sizing: border-box;
  width: 1720px;
  height: 100%;
  float: left;
  padding: 0 10px;
  background-color: #fff;
}
</style>
