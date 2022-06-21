<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">   
                <button  style="float:left; margin-left:15px" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                    <li class="searchIcon" @click="isSearch = ! isSearch"><i class="iconfont icon-sousuo"></i></li>    
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><router-link to="/home">首页</router-link></li>
                    <li><router-link to="/category" >分类</router-link></li>
                    <li><a >关于</a></li>
                    <li><a>留言</a></li>
                    <li><router-link to="/photo" >相册</router-link></li>
                </ul>
                <ul class="nav navbar-nav navbar-right"> 
                    <li @click="isSearch = ! isSearch" class="navSearch"><i class="iconfont icon-sousuo"></i></li>
                    <li class="login_btn"><router-link to ="/login">登录</router-link></li>
                    <li><router-link to ="/home">BackTop</router-link></li> 
                    <li class="switch">
                        <el-switch
                        v-model="value"
                        active-color="rgb(135, 207, 235)"
                        inactive-color="#ccc"
                        active-value="100"
                        inactive-value="0"
                        @change="change"
                        >
                        </el-switch>
                    </li>
                </ul>
            </div>
            <!--/.nav-collapse -->
        </div>
            <div  class="bgc" v-if="isSearch" @click="isBlur" ></div>
            <div>
                 <transition name="el-fade-in-linear">
                <input type="text" class="form-control mySearch"
                placeholder="Search" v-model="keywords"
                @blur="isBlur"  @focus="show = true"
                @keyup="search" v-if="isSearch" autofocus>
                 </transition>
                <transition name="el-fade-in-linear">
                    <div  v-show="show" class = "select">
                        <ul>
                            <li v-for="item in message" :key="item.id">
                            <router-link :to="`/article/${item.id}`">
                                {{item.title}}--{{item.synopsis}}
                            </router-link>
                            </li>
                        </ul>
                    </div>
                </transition> 
            </div> 
    </nav>
</template>

<script>
export default {
    name:'MyNav',
    data(){
        return{
            keywords:null,
            show:false,
            isSearch:false,
            value:false,
            state:0
        }
    },
    methods:{
        search(){
            this.$store.dispatch('keyWords',this.keywords)
        },
        isBlur(){
            this.isSearch = false
            this.show = false
        },
        change(){
            
        }
    },
    computed:{
        message(){
          return  this.$store.state.filterMes 
        }
    },
    mounted(){
         this.$store.dispatch("getMes");
    }
    
}
</script>

<style scoped lang="css">
    @media screen and (max-width:768px) {
        .searchIcon{
            display: block !important;
        }
        .navSearch{
        display: none !important;
        }
        .switch{
            display: none !important;
        }
    }
    @media screen  and (max-width:500px){
        .mySearch{
            width: 300px !important;
            height: 40px !important;
        }
        .select{
            width: 300px !important;
            top: 255px !important;
        }
    }

    .el-switch__core  ::after{
       font-family: "iconfont" !important;
       content: '\e63d' !important;
       font-size: 26px !important;
       color: #000 !important;
    } 
    .navSearch{
        margin: 6px 0;
    }
    .navbar-right .search {
            margin: 8px;  
    }
    .mySearch{
    position: absolute;
    height: 50px;
    width: 400px;
    border-radius: 8px;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    }
    .switch{
        margin: 14px 0px;
    }
    .mySearch ::after{
        position: absolute;
        font-family: "iconfont";
        content: '\e63d';
        font-size: 26px;
        color: #000;
    }
    .select{
        position: absolute;
        top: 265px;
        left: 50%;
        width: 400px;
        transform: translateX(-50%);
        max-height: 280px;
        border-radius: 5px;
        box-shadow: 0 6px 23px 0 rgb(0 0 0 / 16%);
        font-size: 12px;
        color: #000;
        text-align: center;
        background-color: rgba(255, 255, 255, 1);
        z-index: 10;
    }
    .select ul,li,a{
        margin: 0;
        padding: 0;
        text-decoration: none;
        list-style: none;
    }
    .select ul :nth-child(1){
        padding: 10px 5px !important;
    }
    .select li {
    padding: 0px 5px;
    padding-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;   
    text-overflow: ellipsis;
    }
    .bgc{
    position: absolute;
    width: 1000%;
    height: 10000%;
    z-index: 2;
    top: -200px;
    background-color: rgba(34, 34, 34, 0.75);

    }
    .searchIcon{
        float:right;
        margin: 6px 0;
        margin-right: 15px;
        display: none;
    }
</style>


