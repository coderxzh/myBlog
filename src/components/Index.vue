<template>
  <div class="title">
      <span>脚踏实地，笃志前行</span>
      <p>欢迎来到个人博客管理系统</p>
      <router-link to="/backend/upload" tag="button">写文章</router-link>
  </div>
</template>

<script>
export default {
    name:'Index'
}
</script>

<style scoped>
  .title{
    width: 98%;
    height: 40%;
    margin: 20px auto;
    background-color: whitesmoke;
    position: relative;
  }
  .title span{
    font-size: 40px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
 .title p{
    font-size: 20px;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
 }
 .title button{
   position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 35px;
    background-color:rgb(25, 111, 133);
    color:#fff;
    border: none;
    border-radius: 5px;
 }
</style>