<template>
  
        <div class="row">
          <div class="left">
              <div class="img">
                  <img src="https://cdn.jsdelivr.net/gh/coderxzh/PicGoImg/img/user.jpg" alt="">
              </div>
              <div class="text">
                  <div class="text_item name">coderHui</div>
                  <div class="text_item">热爱可抵岁月漫长</div>
                  <div class="text_item  item_middle">
                      <div>
                          <p>文章</p>
                          <p>{{page}}</p>
                      </div>
                      <div>
                          <p>分类</p>
                          <p>3</p>
                      </div>
                      <div>
                          <p>留言</p>
                          <p>4</p>
                      </div>
                  </div>
                  <div class="text_item">
                      <a href="https://github.com/coderxzh"><button>关注我</button></a>
                  </div>
                  <div class="text_item">
                      <div class="icon">
                          <a href="https://qm.qq.com/cgi-bin/qm/qr?k=mdZZYPRWbSwrG3dsGboQ0jQTPOjGuXCi&jump_from=webapi">
                            <span class="iconfont icon-QQ"></span>
                          </a>  
                          <a href=""><span class="iconfont icon-youxiang1"></span></a>
                          <a href="https://github.com/coderxzh">
                            <span class="iconfont icon-github-fill"></span>
                          </a>
                          <a href="https://space.bilibili.com/20320376">
                            <span class="iconfont icon-bilibili-line"></span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          <slot></slot>
     </div>
</template>

<script>
export default {
    name:'MyHeader',
    beforeMount(){
        this.$store.dispatch('getMes')
    },
   computed:{
       page(){
           return this.$store.state.message.length 
       }
   }
}
</script>

<style scoped>
   
.iconfont {
    font-family: "iconfont" !important;
    font-size: 26px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-huojian:before {
    content: "\e689";
}

.icon-sousuo:before {
    content: "\e63d";
}

.icon-icons64x6479:before {
    content: "\e605";
}

.icon-plane:before {
    content: "\e602";
}

.icon-fujian:before {
    content: "\e600";
}

.icon-yanjing:before {
    content: "\e62b";
}

.icon-yingyong:before {
    content: "\e679";
}

.icon-jinrujiantou:before {
    content: "\e88e";
}

.icon-bilibili-line:before {
    content: "\e66d";
}

.icon-youxiang:before {
    content: "\e667";
}

.icon-QQ:before {
    content: "\e73e";
}

.icon-youxiang1:before {
    content: "\e61a";
}

.icon-github-fill:before {
    content: "\e885";
}

    .left {
        background-color: #f8f8f8;
        box-shadow: 0 6px 23px 0 rgb(0 0 0 / 16%);
        height: 442px;
        margin: 0 10px;
        border-radius: 5px;
        position: relative;
    }
    
    .left .img {
        width: 120px;
        height: 120px;
        position: absolute;
        top: 5%;
        left: 50%;
        border-radius: 50%;
        overflow: hidden;
        transform: translateX(-50%);
    }
    .left .img img{
        width: 120px;
        height: 120px;
    }
    
    .left .text {
        position: absolute;
        left: 50%;
        bottom: 10%;
        transform: translateX(-50%);
        width: 84%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;
        font-size: 14px;
    }
   .left .text a{
       text-decoration: none;
       list-style: none;
       color: #000;
   }
    
    .text .text_item {
        flex: 1;
        width: 100%;
    }
    
    .text_item .icon {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
    }
    .text_item .icon span:hover{
        color: skyblue !important;

    }
      .text_item a:hover{
          color: skyblue !important;
      }
    .text_item a {
        flex: 1;
    }
    .item_middle {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    
    .item_middle div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .text .name {
        font-size: 24px;
    }
    
    .text_item button {
        width: 80%;
        height: 100%;
        border-radius: 20px;
        border: none;        
    }
    .text_item button:hover{
       
    box-shadow: 0 2px 10px 0 rgb(65 132 234 / 50%);
    }
    
</style>