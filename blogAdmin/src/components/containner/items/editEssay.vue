<template>
    <div class="data">
        <table class="table">
            <thead>
                <tr style="position: relative;">
                    <td>标题</td>
                    <td class="tr-category">分类</td>
                    <td class="tr-cover">link</td>
                    <td class="tr-time">创建时间</td>
                    <td class="tr-watch" align="center">观看量</td>
                    <td class="tr-starts" align="center">收藏量</td>
                    <td class="tr-right"></td>
                    <div class="search">
                        <input type="text" v-model.trim="keyword" @input="search" />
                        <i class="iconfont icon-sousuo_o"></i>
                    </div>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in initData.list" :key="item.id" class="item-tr">
                    <div class="item-title">{{ item.title }}</div>
                    <td class="tr-title">{{ item.title }}</td>
                    <td class="tr-category">{{ item.category }}</td>
                    <td class="tr-cover">{{ item.cover }}</td>
                    <td class="tr-time">{{ item.create_time }}</td>
                    <td class="tr-watch" align="center">{{ item.watch }}</td>
                    <td class="tr-starts" align="center">{{ item.starts }}</td>
                    <td class="td-btn">
                        <el-button @click="toEdit(index, item)">Edit</el-button>
                    </td>
                    <div class="btn">
                        <el-button @click="toEdit(index, item)">Edit</el-button>
                    </div>
                </tr>
            </tbody>
            <div class="empty" v-if="initData.list?.length <= 0">
                <el-empty description="什么都没有搜到..." />
            </div>
        </table>
        <!-- 分页 -->
        <div style="margin: 10px 0;">
            <el-pagination v-model:currentPage="page" v-model:page-size="offset" :page-sizes="offsetSize"
                layout="sizes, prev, pager, next" :total="initData.list?.length" @size-change="sizeChange"
                @current-change="currentChange">
            </el-pagination>
        </div>
    </div>
    <md-editor v-model="editor.text" :theme="(editor.theme as any)" :preview-theme="editor.previewTheme"
        :code-theme="editor.codeTheme" :toolbarsExclude="toolbarsExclude" :showCodeRowNumber="true" no-katex
        :preview="false" placeholder="开始写文章吧..." :footers="editor.footers" @on-upload-img="onUploadImg"
        @onHtmlChanged="change" class="editor">
    </md-editor>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useEssay } from "@/store/essay"
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import axios from "@/utils/request"
let essayStore = useEssay();
const editor = reactive({
    text: "",
    theme: "light",
    previewTheme: 'vuepress',
    codeTheme: 'kimbie',
    footers: []
})
const toolbarsExclude = ['github', 'save', 'pageFullscreen', 'katex', 'htmlPreview'] as any[];

const offsetSize = [10, 15, 20]
let offset = ref(10)
let page = ref(1)
let keyword = ref("")
type props = {
    id: string;
    title: string;
    describe: string;
    category: string;
    cover: string;
    create_time: string;
    watch: number;
    starts: number;
}
interface Data {
    list: Array<props>
}
let initData = <Data>reactive({})
let currentData = <props>reactive({})
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
const change = (html: string) => {
    essayStore.context = html
}
const init = () => {
    axios.get('/essay', { params: { offset: offset.value, page: page.value } }).then(res => {
        initData.list = (res as any).result
    })
}
init()
const sizeChange = (v: number) => {
    init()
}
const currentChange = (v: number) => {
    init()
}
const toEdit = (index: number, row: any) => {
    axios.get('/getEssayContext', {
        params: {
            id: row.id
        }
    }).then((res: any) => {
        editor.text = res.result[0].context
    })

}
const search = () => {
    axios.get("/searchEssay", {
        params: {
            keyword: keyword.value.toLowerCase()
        }
    }).then((res: any) => {
        if (res.status == 200) {
            initData.list = res.result
        } else {
            initData.list = []
        }
    })
}
</script>

<style lang="less" scoped>
.data {
    max-height: 250px;
    overflow-y: auto;
}

.table {
    border-collapse: collapse;
    width: 100%;
    padding-bottom: 200px;
    font-size: 14px;

    .item-tr {
        @media screen and(max-width:750px) {
            width: calc(~"(100vw - 20px)");
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &:hover {
            background-color: #cccccc80;
        }
    }

    .item-title {
        @media screen and(max-width:750px) {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        width: 250px;
        height: 50px;
        padding: 0 10px;
        line-height: 50px;
        display: none;

    }

    tr {
        height: 50px;
        border-bottom: 1px solid #cccccc80;

        .btn {
            @media screen and(max-width:750px) {
                display: block;
                margin-right: 10px;
                white-space: nowrap;
            }

            display: none;
        }

        td {
            height: 50px;
            padding: 0 10px;
            white-space: nowrap;
        }
    }


    thead,
    tbody {
        .tr-right {
            width: 220px;

            @media screen and(max-width:996px) {
                display: none;
            }
        }

        .tr-title {
            width: 300px;

            @media screen and(max-width:750px) {
                display: none;

            }
        }

        .tr-category,
        .tr-watch,
        .tr-starts {
            @media screen and(max-width:996px) {
                display: none;

            }
        }

        .tr-cover {
            @media screen and(max-width:1600px) {
                display: none;

            }
        }

        .tr-time {
            @media screen and(max-width:1200px) {
                display: none;

            }
        }

    }

    .td-btn {
        @media screen and(max-width:750px) {
            display: none;
        }

        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .empty {
        width: 100%;
        height: 300px;
    }
}

.search {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 220px;

    input {
        border: none;
        width: 220px;
        height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        background-color: #f4f4f4;
        border-radius: 5px;
        outline: none;
    }

    i {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }

}

.editor {
    height: calc(~"(100% - 250px)");
    border: none;
    flex-wrap: wrap !important;
}

//md编辑器
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
    border-top: 1px solid rgba(204, 204, 204, 0.5) !important;
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

:global(.el-select__popper) {
    --el-fill-color-light: #9696961a;
    --el-bg-color-overlay: var(--myBackgroudColor);
}

:global(.el-textarea) {
    --el-input-bg-color: var(--pop-bg);
    --el-input-text-color: var(--myColor);
}

// 分页样式
:deep(.el-pagination) {
    justify-content: flex-end !important;
    --el-pagination-bg-color: var(--myBackgroudColor);
    --el-pagination-text-color: var(--myColor);
    --el-pagination-button-bg-color: var(--myBackgroudColor);
    --el-pagination-button-color: var(--myColor);
    --el-pagination-button-disabled-bg-color: var(--myBackgroudColor);
}

:deep(.el-input__wrapper) {
    background-color: var(--myBackgroudColor) !important;
}

:deep(.el-input__inner) {
    color: var(--myColor) !important;
}

:global(.el-select-dropdown__item) {
    --el-text-color-regular: var(--myColor) !important;
}

:deep(.el-table__empty-block) {
    background-color: var(--myBackgroudColor) !important;
}

:global(.table-title) {
    :deep(.cell) {
        @media screen and(max-width:750px) {
            width: 300px !important;
        }
    }

}

:deep(.el-empty) {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
}
</style>
