<template>
     <form class="login">
        <span>Login</span>
        <input type="text" name="name" id="name" placeholder="用户名" v-model="userInfo.name">
        <input type="password" name="password" id="password" placeholder="密码" v-model="userInfo.password">
        <input type="button" value="登录" class="btn" @click="toLogin">
    </form> 
</template>
<script>
export default {
    name:'Login',
    data(){
        return {
           userInfo:{
            name:'',
            password:""
           }
        }
    },
    methods:{
        toLogin(){
           this.$axios({
              method: 'post',
              url: 'http://127.0.0.1:3000/api/login',
              data:this.userInfo
            }).then(res=>{
                console.log(res);
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
    }
}
</script>
<style>
@media screen and (max-width:510px) {
    .loginTips{
     min-width: 200px !important;
     width: 290px !important;
    }
}
</style>

<style scoped>

@media screen and (max-width:510px) {

    .login {
    width: 290px !important;
    height: 250px !important;
    }
    .login span{
    display: block !important;
    font-size: 40px !important;
    font-weight: 600 !important;
    line-height: 14px !important;
    margin-bottom: 33px !important;
    }
}
body {
    background-color: rgb(16, 81, 97);
}

.login {
    width: 400px;
    height: 300px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background-color: whitesmoke;
    padding: 20px 40px;
    border-radius: 5px;
    box-sizing: border-box;

}

.login span {
    display: block;
    font-size: 42px;
    font-weight: 600;
    text-align: center;
    line-height: 20px;
    margin-top: 20px;
    margin-bottom: 65px;
}

.login input {
    box-sizing: border-box;
    padding: 0 5px;
    width: 100%;
    height: 35px;
    display: block;
    background-color: whitesmoke;
    margin: 20px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
}
.login .btn{
    width: 100%;
    height: 35px;
    display: block;
    background-color: rgb(16, 81, 97);
    color:#fff


}
.login input[type="text"],input[type="password"]:hover{
    border: 1px solid #409EFF;
}


</style>