<template>
  <div>
      <article class="col-lg-6 col-md-9 col-sm-9 col-xs-12">
          <div class="row">
              <slot name="nav"></slot>
          </div>
          <div class="row">
              <div class="middle">
                  <div v-for=" item in message" :key="item.pics">
                      <router-link :to="`/article/${item.id}`" class="cover" style="overflow: hidden;border-radius: 5px;">
                        <!-- <img :src="item.pics" alt=""> -->
                         <el-image
                            class="img"
                            :src="  item.pics"
                            fit="fill"
                            lazy
                            >
                        </el-image>
                      </router-link>
                      <router-link :to="`/article/${item.id}`" class="title">{{item.title}}<i class="iconfont icon-fujian" ></i></router-link>
                      <div class="artic_icon"><i class="iconfont icon-plane icon"></i><span>{{item.create.substring(0,10)}}</span><i class="iconfont icon-yanjing icon"></i><span>浏览量:{{item.views}}</span><i class="iconfont icon-yingyong icon"></i><span>{{item.category}}</span></div>
                      <router-link :to="`/article/${item.id}`" class="synopsis">{{item.synopsis}}</router-link>
                  </div>
              </div>
          </div>
          <div class="buttom">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size = "5"
                :total="total"
                @current-change="getPage"
                >
              </el-pagination>
          </div>
        </article>
  </div>
</template>

<script>
export default {
    name:'MyArticle',
    props:['category'],
    data(){
        return{
            page:1,
        }
    },
    beforeMount(){ 
        this.$store.dispatch('nextPage',{page:1,category:this.category})
    },
    computed:{
        total(){
            return  this.$store.state.message.length
        },
        message(){
            return  this.$store.state.nextPage
        }
    },
    methods:{
        getPage(page){
           this.page = page
           this.$store.dispatch('nextPage',{page,category:this.category})
            window.scrollTo(0, 0)
        },
    },
    watch:{
        category(){
           this.$store.dispatch('nextPage',{page:this.page,category:this.category}) 
        }
    }
}

</script>

<style scoped>
 @media screen and (max-width:965px) {
   .middle div img{
     height: 210px !important;
   }
   .buttom{     
        top: 100.8% !important;  
    }
     article{
        margin-bottom: 70px !important;
        min-height: 800px !important;
    }
 }
    body{
    background-color: #f6f6f6;
    }
    article{
        position: relative;
        margin-bottom: 90px;
        min-height: 1200px;
    }
    .middle {
        margin: 0 10px;
    }
    
    .middle div,
    img {
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
    }
    
    .middle >div {
        margin-bottom: 15px;
        background-color: #f8f8f8;
        box-shadow: 0 6px 23px 0 rgb(0 0 0 / 16%);
    }
    
    .middle div .title {
        margin: 5px 15px;
        font-size: 24px;
    }
    .middle div .title i{
        font-size: 22px !important;
        padding:0 5px ;
        color: #3887fe;
    }
    .middle .icon{
        font-size: 14px !important;
        padding: 0 8px;
    }
    .middle .artic_icon{
        margin: 0 7px;
    }
    .middle div .synopsis {
        margin: 0px 15px;
        font-size: 16px;
        padding-bottom:10px ;
    }
    .middle a{ 
        display: block;
        list-style: none;
        text-decoration: none;
        color: #000000cc;
    }
    
    .middle div .img {
        height: 280px;
        transition:all ease-in-out .5s;    
    }
    .middle div .img:hover{
        transform: scale(1.08);
    }
    .jt {
        font-size: 16px !important;
        margin-right: 10px;
    }
    .nav span {
        line-height: 35px;
    }
    .buttom{
        position: absolute;
        left: 50%;
        top: 101.1%; 
        transform: translateX(-50%);
    }
</style>