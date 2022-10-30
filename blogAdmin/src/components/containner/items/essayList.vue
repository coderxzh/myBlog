<template>
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
                    <el-button type="danger" @click="toDelete(index, item)">Delete
                    </el-button>
                </td>
                <div class="btn">
                    <el-button @click="toEdit(index, item)">Edit</el-button>
                    <el-button type="danger" @click="toDelete(index, item)">Delete
                    </el-button>
                </div>
            </tr>
        </tbody>
        <div class="empty" v-if="initData.list?.length <= 0">
            <el-empty description="什么都没有搜到..." />
        </div>
        <div>
            <el-pagination v-model:currentPage="page" v-model:page-size="offset" :page-sizes="offsetSize"
                layout="sizes, prev, pager, next" :total="initData.list?.length" @size-change="sizeChange"
                @current-change="currentChange">
            </el-pagination>
        </div>
    </table>
    <!-- 分页 -->
    <teleport to="body">
        <transition appear name="animate__animated animate__bounce" enter-active-class="animate__fadeInDown"
            leave-active-class="animate__fadeOutUp">
            <div class="edit" v-show="showEdit" @click.self="showEdit = false">
                <div class="pop">
                    <p class="pop-title">Edit</p>
                    <span>标题*</span>
                    <el-input v-model="currentData.title" placeholder="Please input" size="large" class="el-input" />
                    <span>分类*</span>
                    <el-select v-model="currentData.category" placeholder="选择分类" size="large" lass="el-input"
                        style="width:100%;margin:10px 0">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <span>简介</span>
                    <el-input v-model="currentData.describe" :autosize="{ minRows: 2, maxRows: 4 }" resize="none"
                        type="textarea" placeholder="文章简介" style="margin:10px 0;color:var(--myColor)" />
                    <span>封面*</span>
                    <div class="cover">
                        <input type="file" accept=".png,.jpg,.jpeg" ref="input" name="cover">
                        <div class="checkFile" @click="checkFile">
                            <i class="iconfont icon-shangchuan"></i>
                            <p>点击上传头像</p>
                        </div>
                        <div class="useImg">
                            <img :src="url" alt="" v-if="url" object-fit="contain" />
                            <p v-else>暂无封面...</p>
                        </div>
                    </div>
                    <el-button color="#626aef" class="el-btn" @click="update">上传文章</el-button>
                </div>
            </div>
        </transition>
    </teleport>
    <transition appear name="animate__animated animate__bounce" enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut">
        <div class="mask" v-show="showEdit"></div>
    </transition>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted } from "vue"
import axios from "@/utils/request"
const offsetSize = [10, 15, 20]
let offset = ref(10)
let page = ref(1)
let showEdit = ref(false)
let input = ref();
let file = ref(null)
let url = ref()
let oldCover = ""
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
let initData = reactive({} as Data)
let currentData = reactive({} as props)
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
    Object.assign(currentData, row)
    url.value = row.cover ?? ""
    oldCover = row.cover?.match(/cover\/(.*)/)[1]
    console.log(oldCover);
    showEdit.value = true
}
const toDelete = (index: number, row: any) => {
    ElMessageBox.confirm(
        '是否要删除此文章?',
        'Warning',
        {
            confirmButtonText: 'yes',
            cancelButtonText: 'no',
            type: 'warning',
        }
    )
        .then(() => {
            axios.delete("/deleteEssay", {
                params: {
                    id: row.id
                }
            }).then(res => {
                if (res.status == 200) {
                    ElMessage({
                        showClose: true,
                        message: "删除成功",
                        type: "success",
                        center: true,
                    });
                    showEdit.value = false;
                    init()
                } else {
                    ElMessage({
                        showClose: true,
                        message: ":(出错了",
                        type: "danger",
                        center: true,
                    });
                }
            })

        })
        .catch(() => {
            ElMessage({
                type: 'success',
                message: '已取消删除',
            })
        })
}
const update = () => {
    if (file.value != null) {
        currentData.cover = file.value
    }
    axios.patch('/updateEssay', {
        ...currentData,
        oldCover
    }, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then((res: any) => {
        if (res.status == 200) {
            ElMessage({
                showClose: true,
                message: "修改成功",
                type: "success",
                center: true,
            });
            showEdit.value = false;
            init()
        } else {
            ElMessage({
                showClose: true,
                message: ":(出错了",
                type: "danger",
                center: true,
            });
        }
    })
}
const checkFile = () => {
    input.value.click()
}
const search = () => {
    axios.get("searchEssay", {
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
const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
onMounted(() => {
    input.value.addEventListener("change", (e: any) => {
        currentData.cover = e.target.files[0];
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            url.value = reader.result as string
        }
    });
})
</script>
 

<style lang = 'less' scoped>
.table {
    border-collapse: collapse;
    width: 100%;
    padding-bottom: 200px;
    font-size: 14px;
    margin-bottom: 20px;

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

.edit {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    animation-duration: 1s;

    .pop {
        @media screen and(max-width:750px) {
            width: 80vw;
            height: 550px;
            padding: 20px !important;
        }

        .pop-title {
            @media screen and(max-width:750px) {
                display: none;
            }
        }

        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 500px;
        height: 600px;
        padding: 10px 20px;
        background-color: var(--pop-bg);
        color: var(--myColor);
        box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, .1);
        border-radius: 5px;

        span {
            align-self: start;
        }

        .el-input {
            margin: 10px 0;
        }

        .cover {
            display: flex;
            align-items: center;
            width: 100%;
            height: 150px;
            margin: 10px 0;

            input {
                display: none;
            }

            .checkFile {

                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 150px;
                height: 100%;
                border: 1px dashed #ccc;
                border-radius: 5px;

                p {
                    margin-top: 5px;
                    font-size: 13px;
                }

                i {
                    font-size: 30px;
                    font-weight: bolder;
                }
            }

            .useImg {
                width: 70%;
                height: 100%;
                border-radius: 8px;
                margin-left: 30px;
                overflow: hidden;
                box-shadow: var(--myShadow);
                border: 1px solid #ccc;

                p {
                    margin: 70px 0;
                    text-align: center;
                }

                img {
                    width: 100%;
                    height: 100%;
                }
            }

        }

        .el-btn {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            width: 60%;
            height: 40px;
        }
    }
}

.mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(50, 50, 50, .1);
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
