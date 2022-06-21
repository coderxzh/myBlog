<template>
    <div>
    <transition 
            appear
            name="animate__animated animate__bounce"
            enter-active-class="animate__slideInDown"
            leave-active-class="animate__slideOutUp"
        >
        <el-container>
        <el-main class="box">
            <form class="login" ref="login" :class="{shake:isShak}">
                <div class="row1" key="">
                    <div @click="isShow = false">
                        <i class="iconfont icon-jiantou"></i> 
                    </div>
                </div>
                <div class="row2">
                    <span>欢迎回来</span>
                    <router-link to="" tag="a">
                        注册
                    </router-link>
                </div>
                <div class="row3">
                    <span>请填写以下信息进行登录</span>
                </div>
                <div class="row4">
                    <span>用户名</span>
                    <input type="text" name="userName" v-model="userInfo.name"/>
                </div>
                <div class="row5">
                    <span>密码</span>
                    <input type="password" name="password" v-model="userInfo.password"/>
                </div>
                <div class="row6" @click="toLogin">登录</div>
                <span v-show="isShak" class="tips">请填写完整表单</span>
            </form>
        </el-main>
        <div class="mask"  @click="addShak"></div>
        </el-container>
    </transition>
    </div>
</template> 
<script>
import 'animate.css';
export default {
    name:"login",
    data(){
        return {
           isShow:true,
           isShak:false,
            isTip:false,
            userInfo:{
                name:'',
                password:""
           }
        }
    },
    methods:{
        addShak(){
            let time
            clearTimeout(time)
            this.isShak = !this.isShak
            time =  setTimeout(() => {
            this.isShak = !this.isShak
            }, 500);  
        },
         toLogin(){
           this.$axios({
              method: 'post',
              url: 'http://127.0.0.1:3000/api/login',
              data:this.userInfo
            }).then(res=>{
               if(res.data.code == 100){
                   localStorage.setItem('tooken',res.data.tooken)
                   this.$router.push('/backend/index')
               }else{
                    this.$message({
                        message: '您不是管理员，不能登录',
                        type: 'warning',
                        customClass:"loginTips"  
                    });
               }   
            }).catch(err=>{
                console.log(err);
            }) 
        }
    },
}
</script>
 

<style scoped>
.root{
   z-index: -222;
}
.box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 850px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
 .login{
    z-index: 6;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 560px;
    height: 650px;
    padding: 25px 30px;
    background-color: var(--theme_bg_color);
    box-shadow: var(--theme_bg_shadow);
    color:var(--theme_color);
    border-radius: 10px;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px);
    transition: 0.6s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.login input{
    padding: 15px 16px;
    border: none;
    border-radius: 6px;
    outline: none;
    background-color: #f3f3f4;
    transition: 0.2s;
}
.login input:focus{
    outline: 1px solid #0478be;
}
.login input:hover{
    outline: 1px solid #0478be;
}
.row1{
    width: 100%;
    height: 35px;
    position: relative;
}
.row1 div{
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 35px;
    border-radius: 4px;
    transition: 0.5s;
    transform: translateX(-20px);
}
.row1 div:hover{
    background-color: var(--theme_li);
}
.row2{
    display: flex;
    margin-top: 30px;
    margin-bottom: 10px;
    justify-content: space-between;
    height: 38px;
}
.row2 span{
  color:var(--theme_color);
  font-size: 26px;
  font-weight: 700;
}
.row2 a{
    width: 75px;
    height: 40px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    color:rgb(236, 88, 141);
    transition: 0.5s;
}
.row2 a:hover{
    background-color: rgba(236, 88, 141,0.1);
}
.row3{
    font-size: 20px;
    font-weight: 600;
    color:#999;
}
.row4,.row5{
    display: flex;
    flex-direction: column;
    margin: 15px 0;
}
.row5 span, .row4 span{
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;
}
.row6{
    height: 50px;
    margin-top:30px;
    color:#fff;
    background-color: #0478be;
    line-height: 50px;
    text-align: center;
    border-radius: 30px;
}
 .mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
}
.tips{
    font-size: 16px;
    text-align: center;
    color:rgb(236, 88, 141);
    opacity: 0;
    margin-top: 50px;
    transition: 0.5s;
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
