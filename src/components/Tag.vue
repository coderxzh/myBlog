<template>
   <div class="row">
        <div class="tag">
            <p>标签</p>
            <el-tag class="tag_item" color=""  type="success">Vue.js</el-tag>
            <el-tag class="tag_item" color=""  >JavaScript</el-tag>
            <el-tag class="tag_item" color=""  type="info">Nodejs</el-tag>
            <el-tag class="tag_item" color=""  type="warning">Express</el-tag>
            <el-tag class="tag_item" color=""  type="danger">MySQL</el-tag>
            <el-tag class="tag_item" color=""  type="warning">Element Ui</el-tag>
            <el-tag class="tag_item" color=""  type="danger">Nginx</el-tag>
        </div>
   </div>
</template>

<script>
export default {
    name:'Tag'
}
</script>

<style scoped>
    .tag{
        height: 200px;
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
     .tag_item{
        margin: 10px 5px;
        cursor: pointer;
    }
</style>