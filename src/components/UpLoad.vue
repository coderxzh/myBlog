<template>
  <div class="write">
    <div class="cover">
      <span>写文章</span>
      <form>
        <el-input
          style="margin: 10px 0px"
          v-model="userInfo.title"
          type="text"
          name="title"
          placeholder="请输入博客标题"
        ></el-input>
        <el-input
          style="margin: 10px 0px"
          v-model="userInfo.synopsis"
          type="text"
          name="synopsis"
          placeholder="博客简介"
        ></el-input>
        <el-input
          style="margin: 10px 0px"
          v-model="userInfo.imgUrl"
          type="text"
          name="imgUrl"
          placeholder="博客封面图片地址"
        ></el-input>
        <el-select
          v-model="userInfo.category"
          placeholder="请选择文章分类"
          class="select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button size="small" type="primary" @click="upload" class="btn"
          >点击上传</el-button
        >
      </form>
    </div>
    <!-- 富文本编辑器 -->
    <div class="editor" style="width: 1125px"></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "UpLoad",
  data() {
    return {
      userInfo: {
        title: "",
        synopsis: "",
        imgUrl: "",
        category: "",
        article: "",
        tooken:''
      },
      options: [
        {
          value: "技术文章",
          label: "技术文章",
        },
        {
          value: "常用工具",
          label: "常用工具",
        },
        {
          value: "日常笔记",
          label: "日常笔记",
        },
      ],
      editor: null,
    };
  },
  methods: {
    upload() {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:3000/api/upload",
        data: this.userInfo,
      }).then((res) => {
        console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: "上传成功",
              type: "success",
            });
          } else {
            this.$message.error(":( 出错了");
          }
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.editor = new E(".editor");
    this.editor.config.height = 500;
    this.editor.config.zIndex = 1;
    this.editor.config.pasteFilterStyle = false;
    this.editor.config.onchange = (newHTML) => {
      this.userInfo.article = newHTML;
    };
    this.editor.create();
    this.userInfo.tooken = localStorage.getItem('tooken')
  },
};
</script>

<style scoped>
.cover .text {
  width: 355px;
  height: 30px;
  display: block;
  margin: 15px 0px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.cover {
  width: 400px;
}
.cover span {
  font-size: 20px;
  display: block;
}
.cover .text:hover {
  border: 1px solid #409eff;
}
.cover .select {
  z-index: 2;
  margin: 10px 0;
  float: left;
  margin-right: 80px;
}
.cover .btn {
  padding: 13px 34px !important;
  margin: 10px 30px;
  display: block;
}
/* 富文本编辑器样式 */

/* code 样式 */
code {
  background-color: #282c34 !important;
  color: whitesmoke;
  padding: 5px !important;
}
</style>
