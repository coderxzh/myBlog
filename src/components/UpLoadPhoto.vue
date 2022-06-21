<template>
  <div class="upload">
      <p>相册管理</p>
      <el-input style="margin:10px 0px; width:338px"  v-model="userInfo.imgUrl" type="text" name = "imgUrl" placeholder="请输入相册图片地址"></el-input>
       <el-select v-model="userInfo.category" placeholder="请选择图片分类" class="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button size="small" type="primary" @click="upload" class="btn">点击上传</el-button>
         <el-image class="imgPriew" :src="userInfo.imgUrl" :preview-src-list="[userInfo.imgUrl]" v-if="userInfo.imgUrl" lazy></el-image>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'UploadPhoto',
    data(){
        return{
        options: [{
          value: 'wallpaper',
          label: 'wallpaper'
        },{
          value: 'scenery',
          label: 'scenery'
        },{
          value: 'cartoon',
          label: 'cartoon'
        },{
          value: 'others',
          label: 'others'
        }],
          userInfo:{
          imgUrl:'',
          category: '',
          tooken:''
        } 
    }
    },
    methods:{
         upload(){
         axios({
              method: 'post',
              url: 'http://127.0.0.1:3000/api/photoUpload',
              data:this.userInfo
            }).then(res=>{
              if(res.data.code == 200){
                 this.$message({
                    message: '图片上传成功',
                    type: 'success'
                  });
              }else{
                this.$message.error(':( 出错了');
              }    
            }).catch(err=>{
                console.log(err);
            })   
      }
    },
    mounted(){
      this.userInfo.tooken = localStorage.getItem('tooken')
    }
}
</script>

<style lang="less" scoped>
    .upload{
        width: 400px;
        .imgPriew{
          width: 338px;
          height: 170PX;
          margin: 10px 0;
          border-radius: 5px;
          border:none;
        }
    }
    .btn{
       padding: 13px 28px !important;
       margin: 0 29px;
    }
</style>