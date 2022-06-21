<template>
  <div class="page" >
    <MyNav></MyNav>
    <div class="container top">
      <div class="row">
        <header class="col-lg-3 col-md-3 col-sm-3 hidden-xs">
          <MyHeader></MyHeader>
          <div style="margin:20px 0px">
            <MyAside></MyAside>
            <Tag></Tag>
          </div>
        </header>
        <div class="col-lg-9 col-md-9 col-sm-9 col-xs=9 article">
          <div class="row">
            <div class="middle">
              <a class="cover">
                <img :src="picsUrl" :v-if="picsUrl" />
              </a>
              <a class="title">{{ message.title }}<i class="iconfont icon-fujian"></i></a>
              <div class="artic_icon">
                <i class="iconfont icon-plane icon createTime"></i ><span>{{ createTime }}</span >
                <i class="iconfont icon-yanjing icon"></i ><span>浏览量:{{ message.views }}</span >
                <i class="iconfont icon-yingyong icon"></i ><span>{{ message.category }}</span>
              </div>
            </div>
          </div>
          <div class="content">
            <div v-html="content"></div>
          </div>
          <div class="line"><div class="left"></div><span>本篇文章到此结束，感谢观看</span><div class="right"></div></div>
          <div class="author">
            <p><strong>作者:</strong><span>coderHui</span></p>
            <p><strong>联系:</strong><span>可通过在网站留言联系我</span></p>
            <p><strong>关于:</strong><span>此网站文章均为个人学习笔记，如有错误欢迎留言指正</span></p>
          </div>
          <LiuYan></LiuYan>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "./MyHeader";
import MyNav from "./MyNav";
import LiuYan from "./LiuYan"
import MyAside from "./MyAside"
import Tag from "./Tag"

export default {
  name: "Article",
  components: { MyHeader, MyNav ,LiuYan,MyAside,Tag},
  data() {
    return {
      id: "",
      message: "",
    };
  },
  computed: {
    content() {
      return this.message.article;
    },
    createTime() {
      if(this.message.create){
        return this.message.create.substring(0, 10);
      } return undefined
    },
    picsUrl() {
      if(this.message.pics){

         return this.message.pics;

      }
      return undefined
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.$axios({
      method: "get",
      url: "http://127.0.0.1:3000/api/article",
      params: { id: this.$route.params.id },
    }).then((res) => {
        this.message = res.data.data[0];
      }).catch((err) => {
        console.log(err);
      });
  },
  watch:{
    '$route':function(){
       this.id = this.$route.params.id;
       this.$axios({
          method: "get",
          url: "http://127.0.0.1:3000/api/article",
          params: { id: this.$route.params.id },
        }).then((res) => {
        this.message = res.data.data[0];
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>
<style lang="less" scoped>
   .page .article /deep/ .content   {

     h1,h2,h3,h4,h5,ul,li,p,strong{
        color:#333 !important;
     }
     
    
    
  }
</style>
<style scoped>
 @media screen and (max-width:965px) {
   .middle img{
     height: 210px !important;
   }
 }
body{
  background-color: #f6f6f6;
}

.top {
  margin-top: 70px;
}
.article {
  background-color: #f8f8f8;
  box-shadow: 0 6px 23px 0 rgb(0 0 0 / 16%);
  color: #666;
  border-radius: 5px;
  margin-bottom: 60px;
}

.middle {
  margin-bottom: 15px;
  position: relative;
  padding: 0 15px;
  border:none
}
.middle img {
  width: 100%;
  height: 300px;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
}

.middle .title {
  margin: 5px 0px;
  font-size: 24px;
}
.middle .title i {
  font-size: 22px !important;
  padding: 0 5px;
  color: #3887fe;
}
.middle .icon {
  font-size: 14px !important;
  padding: 0 8px;
}
.middle .createTime {
  padding-left: 0px;
}
.middle .synopsis {
  margin: 0px 15px;
  font-size: 16px;
  padding-bottom: 10px;
}
.middle a {
  display: block;
  list-style: none;
  text-decoration: none;
  border:none;
  color: #000000cc;
}

article .nav {
  margin: 0 10px;
  height: 35px;
  margin-bottom: 10px;
  font-size: 14px;
  border-radius: 8px;
}
.jt {
  font-size: 16px !important;
}
.nav span {
  padding: 0 5px;
  line-height: 35px;
}
.line {
  width: 100%;
  height: 1px;
  display: flex;
  margin: 60px 0; 
}
.line .left{
 flex: 2;
 background-color: #3887fe;
}
.line .right{
 flex: 2;
  background-color: #3887fe;
}
.line span{
  font-size: 16px;
  font-style: italic;
  color: #000;
  padding: 0 5px;
  line-height: 2px;
}
.author{
  height: 126px;
  background-color: rgba(204, 213, 245, 0.603);
  padding: 12px 10px;
  border-radius: 5px;
}
.author p{
  margin: 5px 0px;
  font-size: 16px;
  color: #000000CC;

}
.author p strong{
  font-weight:bolder;
  margin-right: 10px;
  
}
</style>
