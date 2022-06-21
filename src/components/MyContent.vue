<template>
<div class="myBlock">
    <MyNav></MyNav>
    <div class="top">
    <div class="container">
        <div class="row">
            <header class="col-lg-3 col-md-3 col-sm-3 hidden-xs">
                <MyHeader></MyHeader> 
            </header>
            <MyArticle category="0">
              <div class="nav" slot="nav">
                  <span style="font-weight: 600;">首页</span><span class="iconfont icon-jinrujiantou jt"></span><span>推荐</span>
              </div>
            </MyArticle>
             <aside class="col-lg-3  hidden-md hidden-sm hidden-xs">
                <MyAside></MyAside>
                <Tag></Tag>
                <News></News>  
             </aside>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import MyHeader from "./MyHeader"
import MyArticle from "./MyArticle"
import MyAside from "./MyAside"
import MyNav from "./MyNav"
import Tag from "./Tag"
import News from "./News"
export default {
    name:'MyContent',
    components:{MyNav,MyHeader,MyArticle,MyAside,Tag,News},
}
</script>

<style scoped>
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
    
    body {
        font-family: "微软雅黑", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    
    .top {
        margin-top: 70px;
    }
    .nav {
        margin: 0 10px;
        height: 35px;
        margin-bottom: 10px;
        padding: 0px 15px;
        font-size: 14px;
        color: #777;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0px 0px 6px 0 rgb(0 0 0 / 16%);
    }
</style>

