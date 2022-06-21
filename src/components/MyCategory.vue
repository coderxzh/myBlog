<template>
<div class="myBlock">
    <MyNav></MyNav>
    <div class="top">
    <div class="container">
        <div class="row">
            <header class="col-lg-3 col-md-3 col-sm-3 hidden-xs">
                <MyHeader></MyHeader> 
            </header>
            <MyArticle :category = "category">
              <div class="nav" slot="nav">
                  <span style="font-weight:600">首页</span><span class="iconfont icon-jinrujiantou jt"></span><span>分类</span>
                  <ul class="Myul" @click="target">
                      <li style="background-color: #3887fe;color:#fff;">全部文章</li>
                      <li>日常笔记</li>
                      <li>常用工具</li>
                      <li>技术文章</li>
                      <li>个人随笔</li>
                  </ul>
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
    name:'MyCategory',
    components:{MyNav,MyHeader,MyArticle,MyAside,Tag,News},
    data(){
        return{
            category:"0"
        }
    },
    methods:{
        target(e){
            const lis = document.querySelector('.Myul').querySelectorAll('li')
            for(let i =0;i<lis.length;i++){
                lis[i].style.backgroundColor = '#f5f5f5'
                lis[i].style.color = '#333'
            }
            e.target.style.backgroundColor = "#3887fe"
            e.target.style.color = "#fff"
            if(e.target.innerText =="全部文章"){
                this.category = "0"
            }else{
                this.category = e.target.innerText
            }
        }
    }
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
      
    @media screen and (max-width:966px) {       
      .nav li{
            padding: 7px 5px !important;
            font-size: 12px !important;
            margin-right: 5.5px !important;
            margin-top: 5px !important;
      }
      .nav ul :nth-child(5){
           margin-right: 0px !important;
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
        height: 80px;
        margin-bottom: 10px;
        padding: 0px 10px;
        font-size: 14px;
        color: #777;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0px 0px 6px 0 rgb(0 0 0 / 16%);
    }
    .nav ul,li{
        text-decoration: none;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .nav li{
        float: left;
        padding: 7px 14px;
        background-color: #f5f5f5;
        color:#333;
        border-radius: 5px;
        margin-right: 8px;
        cursor:pointer;
    }
</style>

