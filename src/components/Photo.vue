<template>
    <div class="root">
        <MyNav></MyNav>
        <div class="container buttom">
            <div class="row">
                <header class="col-lg-3 col-md-3 col-sm-3 hidden-xs">
                    <MyHeader></MyHeader> 
                </header>
                <div class="photo col-lg-9 col-md-9 col-sm-9 col-xs=9">
                        <h4>推荐壁纸</h4>
                            <el-carousel el-carousel :interval="5000" :height ="imgHeight" style="border-radius: 10px;" class="swiper"> 
                                <el-carousel-item   v-for="(item,index) in wallpaper" :key="index">
                                <img ref="imgH" :src="item.url" alt="" @load="imgLoad">
                                </el-carousel-item>
                            </el-carousel>
                        <div class="show">
                            <div class="wallpaper">
                                <h4>精选壁纸</h4>
                                <el-image v-for="(item,index) in wallpaper" :key="index" :src="item.url" :preview-src-list="[item.url]" lazy></el-image> 
                            </div>
                            <div class="scenery">
                                <h4>风景人文</h4>
                                <el-image v-for="(item,index) in scenery" :key="index" :src="item.url" :preview-src-list="[item.url]" lazy></el-image> 
                            </div>
                            <div class="cartoon">
                                <h4>游戏动漫</h4>
                                <el-image v-for="(item,index) in cartoon" :key="index" :src="item.url" :preview-src-list="[item.url]" lazy></el-image>
                            </div>
                            <div class="others">
                                <h4>个人收藏</h4>
                                 <el-image v-for="(item,index) in others" :key="index" :src="item.url" :preview-src-list="[item.url]" lazy></el-image>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyHeader from "./MyHeader";
import MyNav from "./MyNav";
export default {
    name:'Photo',
    components: { MyHeader, MyNav },
    data(){
        return{
            message:Array,
            imgHeight:''
        }
    },
    mounted(){
        this.$axios({
        method: "get",
        url: "http://127.0.0.1:3000/api/photo",
        })
        .then((res) => {
            this.message = res.data.data;
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods:{
        imgLoad(){
        this.$nextTick(()=>{
            this.imgHeight = `${this.$refs.imgH[0].height}px`; 
        })

    }},
    computed:{
        wallpaper(){
            if(this.message[0]){
                return this.message.filter(item =>{
                 return item.category == 'wallpaper'
                })
            }else{
                return undefined
            }  
        },
        scenery(){
        if(this.message[0]){
             return this.message.filter(item =>{
                return item.category == 'scenery'
             })
          }else{
              return undefined
          }
           
        },
        cartoon(){
            if(this.message[0]){
              return this.message.filter(item =>{
                 return item.category == 'cartoon'
              })
            }else{
               return undefined
            }
        },
        others(){
             if(this.message[0]){
               return this.message.filter(item =>{
                 return item.category == 'others'
              })
            }else{
                return undefined
            }
        }

    }
}
</script>

<style scoped>
@media screen and (max-width:975px) {
    .show div div {
        float: none !important; 
        display: block !important;
        margin:10px auto !important;
    }
     .swiper img {
       height: 200px !important;
    }
}
.photo{
  box-shadow: 0 6px 23px 0 rgb(0 0 0 / 16%);
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 26px;
  padding-bottom: 30px;
 
}
.photo h4{
    font-size: 16px;
    font-weight: bold;
}
.photo .swiper img{
    height: 350px;
}
.photo img{
   width: 100%;
   height: 100%;
   border-radius: 10px;
}
.buttom{
    margin-top: 70px;
}
.show {
    display: flex;
    flex-direction: column;
    overflow: auto;
}
.show > div{
   width: 100%;
   display: block;
   overflow: auto;
}
.show div h4{
   display: block;
}
.show div div {
  width: 320px;
  height: 166px;
  float: left;
  border-radius: 10px;
  overflow: hidden;
  margin:10px 22px
}

</style>