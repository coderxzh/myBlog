<template>
<div class="root">
    <el-select
    v-model="value"
    filterable
    remote
    reserve-keyword
    placeholder="请输入文章关键词"
    :remote-method="search"
    @change = "getArticle"
    :loading="loading"
    style="margin:20px 0;width:300px;margin-right:40px"
    lazy
    >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.title"
      :value="item.title">
    </el-option>
  </el-select>
  <el-button type="primary" @click="update">上传博客</el-button>
      <div class="ArticleEditor" ></div>
</div>
  
</template>

<script>
import E from "wangeditor"
export default {
    name:'ArticleEditor',
    data(){
        return{
            value:'',
            loading:false,
            userInfo:{
                article:'',
                id:'',
                tooken:''
            },
            options:[],
            data:[]
        }
    },
    methods:{
        search(query){
           if(query!==''){
               this.loading = true
               setTimeout(()=>{
                   this.loading = false;
                   this.options = this.data.filter(item=>{
                   return item.title.includes(query)||item.synopsis.includes(query) || item.category.includes(query)
                 })
               },600)
           }
        },
        getArticle(query){
           let select =  this.options.filter(item=>{
                return item.title==query||item.synopsis ==query||item.category ==query
            })
            this.userInfo.id = select[0].id
            this.$axios({
                method: "get",
                url: "http://127.0.0.1:3000/api/article",
                params: { id: select[0].id },
                })
                .then((res) => {
                    this.editor.txt.html(res.data.data[0].article)
                })
                .catch((err) => {
                    console.log(err);
            });
        },
        update(){
              this.$axios({
              method: 'post',
              url:'http://127.0.0.1:3000/api/update',
              data: this.userInfo
            }).then(res=>{
               if(res.data.code ==200){
                 this.$message({
                    message: '上传成功',
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
       this.$axios({
            method: 'get',
            url: 'http://127.0.0.1:3000/api/home',
        }).then(res => {
           this.data =  res.data.data
        }).catch(err=>{
            console.log(err);
        })
      this.editor = new E(".ArticleEditor")
      this.editor.config.height = 500
      this.editor.config.pasteFilterStyle = false
       this.editor.config.zIndex = 1
      this.editor.config.onchange = (newHTML)=>{
      this.userInfo.article =newHTML
      }
      this.editor.create()
      this.userInfo.tooken = localStorage.getItem('tooken')
    }
}
</script>

<style>
 body pre{
     padding: 5px 10px !important;
 }
</style>