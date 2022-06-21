<template>
    <div class="root">
        <el-backtop style="height: 50px;width: 50px;" class="backTop">
            <div
            style="{
            border-radius:50%;
            text-align: center;}"
            >
            <i class="iconfont icon-huojian" style="font-size:28px"></i>
            </div>
       </el-backtop> 
       <router-view></router-view>
    </div>
</template>

<script>
export default {
  name:'App'
}
</script>

<style>
    @media screen and (min-width:1200px) {
        .container {
            width: 1500px;
        }
    }
    
    @media screen and (min-width:1200px) and (max-width:1500px) {
        .container {
            width: 1200px;
        }
    }
    @media screen and (max-width:975px) {
     .backTop{
     right:15px !important;
    }
    }
    :root {
    /* 元素背景色 */
    --theme_bg_color: #fff;
    /* body背景色 */
    --them_bg_body:#f4f4f4;
    /* 背景的阴影 */
    --theme_bg_shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    /* 字体颜色 */
    --theme_color: #4a4a4a;

    --theme_nav:#cfcfcf;

    --theme_li:rgb(230, 230, 230);
    }
    ::-webkit-scrollbar {
    width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    body {
        font-family: "微软雅黑", "Helvetica Neue", Helvetica, Arial, sans-serif;
       
    }
    
    body a:hover{
        color:#3887fe !important;
    }
    body .el-popup-parent--hidden{
       padding-right: 0 !important;
    }
    
   body pre {
    display: block !important;
    border-left: 8px solid #d0e5f2 !important;
    border-radius: 5px !important;
    padding: 8px 10px !important;
    margin: 10px 0 !important;
    color:whitesmoke !important;
    line-height: 2 !important;
    font-size: 100% !important;
    background-color: #282c34 !important;
    }

/* code 样式 */
body code {
  display: inline-block !important;
  *display: inline !important;
  *zoom: 1;
  background-color: #282c34 !important;
  color: whitesmoke !important;
  margin-right: 5px !important;
}
body pre code xmp{
  margin: 0 !important;
}
body blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #439afd;
    background-color: rgba(204, 213, 245, 0.603) !important;
}
</style>