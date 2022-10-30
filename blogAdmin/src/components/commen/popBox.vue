<template>
  <transition name="animate__animated animate__bounce" enter-active-class="animate__slideInDown"
    leave-active-class="animate__slideOutUp">
    <div class="myBox" @click.self="hidden" v-if="isPop" key="pop" ref="myBox">
      <div class="pop">
        <span>文章信息</span>
        <div class="row1">
          <span>文章标题*</span>
          <el-input v-model="essayMessage.title" placeholder="请输入文章标题" size="large" />
        </div>
        <div class="row2">
          <span>文章简介*</span>
          <el-input v-model="essayMessage.describe" :autosize="{ minRows: 2, maxRows: 3 }" resize="none" type="textarea"
            placeholder=" 请输入文章简介" />
        </div>
        <div class="row3">
          <span>文章分类*</span>
          <el-select v-model="essayMessage.category" placeholder="文章分类" size="large" transfer="true" :teleported="false"
            popper-class="select-popper" style="width: 100%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <!-- 图片上传区 -->
        <div class="row4">
          <div class="last">
            <el-upload class="upload-demo" drag action="" name="cover" :limit="1" multiple :auto-upload="false"
              :on-change="change" :on-remove="remove">
              <el-icon class="iconfont icon-upload" style="font-size: 50px">
                <upload-filled />
              </el-icon>
              <div class="el-upload__text">拖拽或 <em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip" style="width: 229px">
                  jpg/png files with a size less than 5mb
                </div>
              </template>
            </el-upload>
            <el-image style="width: 300px; height: 150px; border-radius: 5px" fit="cover" :src="url">
              <template #error>
                <div class="iconfont icon-xiangce error"></div>
              </template>
            </el-image>
          </div>
        </div>
        <!-- 上传按钮 -->
        <el-button color="#626aef" style="
            position: absolute;
            bottom: 40px;
            width: 50%;
            height: 45px;
            font-size: 20px;
          " @click="upload">
          提交文章</el-button>
      </div>
    </div>
  </transition>
  <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeIn"
    leave-active-class="animate__fadeOut">
    <div class="mask" v-if="isPop"></div>
  </transition>
</template>
<script lang="ts" setup>
import "animate.css";
import mitt from "../../utils/mitt";
import axios from "../../utils/request";
import { dateFormat } from "../../utils/dateFormat";
import { nanoid } from "nanoid";
import { reactive, ref } from "vue";
import { useEssay } from "../../store/essay"
let essayStore = useEssay();
let isPop = ref(false);
let myBox = ref(null);
interface Essay {
  title: string;
  describe: string;
  category: string;
  cover: any;
}
let essayMessage = <Essay>reactive({});
let url = ref<string>();
let options = [
  {
    value: "日常笔记",
    label: "日常笔记",
  },
  {
    value: "技术文章",
    label: "技术文章",
  },
  {
    value: "javascript",
    label: "javascript",
  },
  {
    value: "nodejs",
    label: "nodejs",
  },
  {
    value: "日常生活",
    label: "日常生活",
  },
];
mitt.on("show", (data) => {
  isPop.value = data as boolean;
});
let hidden = () => {
  isPop.value = false;
};
let change = (file: any) => {
  var reader = new FileReader();
  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    url.value = reader.result as string;
  };
  essayMessage.cover = file.raw;
};
let remove = (file: any) => {
  url.value = "";
  essayMessage.cover = "";
};
let upload = () => {
  const id = nanoid(8);
  dateFormat()
  const createTime = new Date().Format("yyyy-MM-dd HH:mm")
  axios({
    method: "post",
    url: "/uploadEssay",
    data: {
      ...essayMessage,
      context: essayStore.context,
      createTime,
      id,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => {
    if (res.status == 200) {
      ElMessage({
        showClose: true,
        message: "上传成功",
        type: "success",
        center: true,
        appendTo: myBox.value,
      });
    } else {
      ElMessage({
        showClose: true,
        message: "上传失败",
        type: "danger",
        center: true,
        appendTo: myBox.value,
      });
    }
  });
};
</script>

<style lang="less" scoped>
.myBox {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 3000;

  .pop {
    position: relative;
    width: 560px;
    height: 650px;
    padding: 25px 35px;
    border-radius: 5px;
    background-color: var(--myBackgroudColor);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    align-items: center;

    &>span {
      font-size: 26px;
      font-weight: blod;
    }

    .row1,
    .row2,
    .row3,
    .row4 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin: 15px 0;

      span {
        margin-bottom: 8px;
      }
    }

    .row4 {
      .last {
        display: flex;
        justify-content: space-between;
        width: 100%;

        img {
          width: 300px;
          height: 150px;
          border-radius: 5px;
        }
      }
    }
  }
}

:deep(.error) {
  width: 100%;
  height: 100%;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(204, 204, 204, 0.2);
}

.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2999;
}
</style>
