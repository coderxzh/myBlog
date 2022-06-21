<template>
    <div class="row">
        <div class="news">
            <p>分类</p>
            <ul style="margin: 0 auto">
                <!-- <li><span class="iconfont"></span> 日常笔记</li>
                <li><span class="iconfont"></span> 技术文章</li>
                <li><span class="iconfont"></span> 常用工具</li>
                <li><span class="iconfont"></span> 踩坑记录</li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"News",
    mounted(){
         this.$axios({
            method: 'get'
        }).then(res => {
           console.log(res);
        }).catch(err=>{
            console.log(err);
        })

    }

}
</script>

<style scoped>
    .news{
        height: 150px;
        background-color: #f8f8f8;
        box-shadow: 0 6px 23px 0 rgb(0 0 0 / 16%);
        border-radius: 5px;
        padding: 15px;
        margin: 20px 10px;
        box-sizing: border-box;   
    }
     p{
        font-size: 14px;
        color:#333;
        font-weight: 600;
    }
    ul,li{
        text-decoration: none;
        list-style: none;
        padding: 0;
        margin: 0;
        color: #888;
    }
    li{
        float: left;
        padding: 8px 5px;
        margin: 5px 2px;
        border-radius: 5px;
    };
</style>