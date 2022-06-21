<template>
    <div class="row">
        <div class="right">
                <span style="font-weight: 600;">最新文章</span>
            <div class="news">   
                <div  v-for="item in newMessage " :key="item.pics">
                    <img :src="item.pics" alt="">
                    <div class="box"> 
                        <p><router-link :to="`/article/${item.id}`" class="cover">{{item.title}}</router-link></p>
                        <div> <i class="iconfont icon-yingyong icon"></i><span><router-link :to="`/article/${item.id}`" class="cover">{{item.category}}</router-link></span></div>
                        <div> <i class="iconfont icon-plane icon"></i><span><router-link :to="`/article/${item.id}`" class="cover">{{item.create.substring(0,10)}}</router-link></span></div>     
                    </div>   
                </div>               
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'MyAside',
   computed:{
        newMessage(){
             if(this.$store.state.message[0]){
                 return this.$store.state.message.filter((item,index)=>{
                     return index <= 3
                 })
             }else{
                 return undefined
             }
     }
    }
}
</script>

<style scoped>

     .right {
        background-color: #f8f8f8;
        box-shadow: 0 6px 23px 0 rgb(0 0 0 / 16%);
        height: 400px;
        padding: 18px;
        margin: 0 10px;
        border-radius: 5px;
    } 
    .news {
        display: flex;
        flex-direction: column;
    }
    
    .news div {
        flex: 1;
        display: flex;
    }
    
    .news div img {
        width: 70px;
        height: 70px;
        margin: 15px 15px 0 0;
        border-radius: 5px;
    }
    .news div .box{
        display: flex;
        flex-direction: column;
    }
    .news div .box p {
        margin: 0;
        margin-top: 15px;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .news div i{
        font-size: 12px !important;
        line-height: 20px;
        padding-right:5px;
    }
    .box a{
        text-decoration: none;
        list-style: none;
        color: #000;
    }
</style>