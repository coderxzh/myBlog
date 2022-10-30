<template>
  <md-editor v-model="essayStore.context" :theme="(editor.theme as any)" :preview-theme="editor.previewTheme"
    :code-theme="editor.codeTheme" :toolbarsExclude="toolbarsExclude" :showCodeRowNumber="true" no-katex
    :editorId="editor.id" :noPrettier="true" :preview="false" placeholder="开始写文章吧..." :footers="editor.footers"
    @on-upload-img="onUploadImg" class="editor">
  </md-editor>
  <slider></slider>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useEssay } from "@/store/essay"
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import slider from "components/commen/slider.vue";
import mitt from "@/utils/mitt";
import axios from "@/utils/request"
let essayStore = useEssay();
const editor = reactive({
  theme: "light",
  previewTheme: 'vuepress',
  codeTheme: 'kimbie',
  id: 'my-editor',
  footers: [],
})
const toolbarsExclude = ['github', 'save', 'pageFullscreen', 'katex', 'htmlPreview'] as any[];
const onUploadImg = async (files: any, callback: any) => {
  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('file', file);
        axios
          .post('/api/img/upload', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res: any) => rev(res))
          .catch((error: any) => rej(error));
      });
    })
  );
  callback(res.map((item) => item.data.url));
};
// 保存文章
mitt.on("save", (context) => {
  localStorage.setItem(context as string, essayStore.context);
});
</script>

<style lang="less" scoped>
.editor {
  height: 100%;
  border: none;
  flex-wrap: wrap !important;
}

:deep(.md-toolbar) {
  min-width: 375px !important;
}

:deep(.md-toolbar-left) {
  flex-wrap: wrap !important;
}

:deep(.md-toolbar-wrapper) {
  width: 100%;
  height: auto !important;
  background-color: var(--myBackgroudColor) !important;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5) !important;
}

:deep(.md-toolbar-item) {
  &:hover {
    background-color: rgba(150, 150, 150, 0.2) !important;
  }
}

:deep(.md-content) {
  background-color: var(--myBackgroudColor) !important;
}

:deep(.md-catalog) {
  background-color: var(--myBackgroudColor) !important;
  border-left: 1px solid rgba(204, 204, 204, 0.5) !important;
}
</style>
