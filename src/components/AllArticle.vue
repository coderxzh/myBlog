<template>
  <div class="table">
      <el-table
      :data="tableData"
      style="width: 100%">
       <el-table-column
        prop="create"
        label="创建时间"
        sortable
        width="130">
        <template slot-scope="scope">
            <span v-show = "!scope.row.isShow">{{scope.row.create.substring(0,10)}}</span>
            <el-input maxlength=15 minlength=5 placeholder="请输入创建时间" v-show ="scope.row.isShow" v-model = "scope.row.create"></el-input>
         </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="230">
         <template slot-scope="scope">
            <span v-show = "!scope.row.isShow">{{scope.row.title}}</span>
            <el-input maxlength="15" show-word-limit placeholder="请输入标题" v-show ="scope.row.isShow"  v-model = "scope.row.title"></el-input>
         </template>
      </el-table-column>
      <el-table-column
        prop="synopsis"
        label="简介"
        width="380">
         <template slot-scope="scope">
            <span v-show = "!scope.row.isShow">{{scope.row.synopsis}}</span>
            <el-input  maxlength="30" show-word-limit placeholder="请输入文章简介" v-show ="scope.row.isShow" v-model = "scope.row.synopsis"></el-input>
         </template>
      </el-table-column>
      <el-table-column
        prop="category"
        label="文章分类"
        width="130">
        <template slot-scope="scope">
            <span v-show = "!scope.row.isShow">{{scope.row.category}}</span>
            <el-input change = "upLoad" maxlength="6" minlength="4" placeholder="请选择文章分类" v-show ="scope.row.isShow" v-model = "scope.row.category"></el-input>
         </template>
      </el-table-column>
      <el-table-column
        prop="pics"
        label="封面图片地址">
        <template slot-scope="scope">
            <span v-show = "!scope.row.isShow">{{scope.row.pics}}</span>
            <el-input change = "upLoad" placeholder="请输入图片地址" v-show ="scope.row.isShow" v-model = "scope.row.pics"></el-input>
         </template>
      </el-table-column>
      <el-table-column width="180" class="isShow">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"  v-show = "!scope.row.isShow">编辑</el-button>
        <el-button
        size="mini"
        @click="saveEdit(scope.$index, scope.row)" v-show = "scope.row.isShow">保存</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name:'AllArticle',
    data(){
        return{
            tableData:undefined,
            isShow:false
        }
    },
    methods:{
        handleEdit(index, row){
            row.isShow = true
        },
        handleDelete(index, row){
            console.log(index,row);
        },
        saveEdit(index,row){
            row.isShow = false
            row.tooken = localStorage.getItem('tooken')
            this.$confirm('是否确认上传', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                   this.$axios({
                    method: 'post',
                    url: 'http://127.0.0.1:3000/api/editor',
                    data:row
                    }).then(res=>{
                      console.log(res);
                        if(res.data.code==200){
                            this.$message({
                            type: 'success',
                            message: '上传成功!'
                          });
                        }else{
                            this.$message.error('上传出错');
                        }    
                    }).catch(err=>{
                        console.log(err);
                    })

                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消上传'
                });          
          });
      }
   },
    beforeMount(){
         this.$axios({
            method: 'get',
            url: 'http://127.0.0.1:3000/api/home',
        }).then(res => {
           this.tableData = res.data.data
        }).catch(err => {
            console.log(err);
        })
    }
}
</script>

<style>

</style>