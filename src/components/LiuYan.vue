<template>
   <div class="row liuyan">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs=12  nikeName">
              <p>*昵称</p>
              <input type="text" class="form-control" placeholder="请输入昵称" v-model="nikeName" style="height:40px">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs=12 email">
              <p>*邮箱</p>
              <input type="email" class="form-control" placeholder="请输入邮箱" v-model="email" style="height:40px">
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs=12 context">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="说点什么吧..."
              v-model="message"
              style="margin-bottom: 15px;"
              maxlength="200"
              minlength="5"
              show-word-limit
              >
            </el-input>
            <el-button  class="submit" @click="submit" type="primary" round>提交留言</el-button>
            </div>
            <div class=" col-lg-12 col-md-12 col-sm-12 col-xs=12 show">
              <div v-for="(item,index) in AllMessages" :key="index">
                <div class="userInfo">
                  <div class="userimg">{{item.nikename.substring(0,1)}}</div>
                  <div class="name">
                      <div class="nikename">{{item.nikename}}</div>
                      <div class="time">{{item.create.substring(0,10)}}</div>
                  </div>
                </div>
                <div class="words">{{item.message}}</div>
              </div>
            </div>
          </div>
</template>

<script>
export default {
    name:'LiuYan',
    data(){
        return{
            nikeName:'',
            email:'',
            message:'',
            AllMessages:'',
            id:''
        }
    },
    methods:{
        submit(){
          if(this.nikeName && this.email && this.message.length>=4){
            this.$confirm('是否确认提交留言？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              customClass:"tips"
            }).then(() => {
               this.$axios({
                    method: 'post',
                    url: 'http://127.0.0.1:3000/api/message',
                    data:{nikeName:this.nikeName,email:this.email,message:this.message,id:this.id}
                }).then(res=>{
                    console.log(res);
                    this.$message({
                    type: 'success',
                    message: '提交成功!',
                    customClass:"scusses"
                    });
                }).catch(err=>{
                    console.log(err);
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消',
                customClass:"cancel"
              });          
            });
          }else{
              this.$message({
                showClose: true,
                message: '请输入完整的信息',
                type: 'warning',
                customClass:"tips2"
              });
            }
        }
    },
  
    mounted(){
        this.id = this.$route.params.id;
         this.$axios({
                method: 'get',
                url: 'http://127.0.0.1:3000/api/getMessage',
                params: { id: this.$route.params.id }
                }).then(res=>{
                    this.AllMessages = res.data.data
                }).catch(err=>{
                    console.log(err);
              })

        }
}
</script>

<style>
 @media screen and (max-width:900px) {

   .tips{
     width: 320px !important;
   }
   .scusses{
     min-width: 200px !important;
     width: 270px !important;
   }
   .cancel{
     min-width: 200px !important;
     width: 270px !important;
   }
   .tips2{
     min-width: 200px !important;
     width: 270px !important;
   }

 }
</style>

<style scoped>

.nikeName,.email{
  margin: 15px 0;
}
.liuyan p{
   padding: 0 3px
} 
.liuyan{
  margin-bottom: 20px;
}
.submit {
  margin-bottom: 30px;
}
.show div .userInfo{
    height: 50px;
}
.show div .userInfo .userimg{
    width: 40px;
    height: 40px;
    margin: 5px 0px;
    border-radius: 50%;
    background-color: #ccc;
    float: left;
    margin-right:10px;
    text-align: center;
    line-height: 38px;
    font-size: 20px;
    color: #fff;
}
.show div .userInfo .name{
    line-height: 25px;
    font-size: 12px;
}
.show div .userInfo .name .nikename{
    font-size: 16px;
}
.show div .words{
    margin: 10px ;
    font-size: 16px;

}

</style>