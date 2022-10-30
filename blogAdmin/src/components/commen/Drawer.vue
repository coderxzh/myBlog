<template>
    <el-drawer direction="ltr" custom-class="myDrawer" v-model="showDrawer" :show-close="false" :with-header="false"
        size="280px">
        <ul ref="list">
            <div class="title">
                <img src="../../assets/logo.png" alt="" />
                <span>BlogAdmin</span>
            </div>
            <router-link to="/home">
                <i class="iconfont icon-diannao"></i><span>首页</span>
            </router-link>
            <a @click="show"><i class="iconfont icon-xiepinglun"></i><span>文章管理</span></a>
            <transition name="fade">
                <div class="visiable" v-show="visiable">
                    <router-link to="/addEssay">
                        <span>文章编写</span>
                    </router-link>
                    <router-link to="/">
                        <span>文章列表</span>
                    </router-link>
                    <router-link to="/">
                        <span>编辑文章</span>
                    </router-link>
                </div>
            </transition>
            <a><i class="iconfont icon-yonghu1"></i><span>用户管理</span></a>
            <a><i class="iconfont icon-xiangce"></i><span>相册</span></a>
            <a><i class="iconfont icon-jinggao2"></i><span>错误页面</span></a>
            <a><i class="iconfont icon-hulianwang"></i><span>国际化</span></a>
        </ul>
    </el-drawer>
</template>
 
 
<script lang='ts' setup>
import "animate.css";
import { ref } from "vue"
import { useStatus } from "../../store/status"
import { storeToRefs } from "pinia"
const statuStore = useStatus();
const { showDrawer } = storeToRefs(statuStore)
const visiable = ref(false);
let list = ref();
const show = () => {
    visiable.value = !visiable.value;
};
window.addEventListener("resize", function () {
    statuStore.showDrawer = false;
});
</script>
 

<style lang = 'less' scoped>
.fade-enter-from,
.fade-leave-to {
    height: 0 !important;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s;
}

.fade-enter-to,
.fade-leave-from {
    height: 159px !important;
}

.myDrawer {
    padding: 20px;
    font-size: 18px;
    color: var(--myColor);
    user-select: none;

    ul {
        display: flex;
        flex-direction: column;

        .title {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;

            span {
                font-size: 18px;
                font-weight: bold;
                color: var(--myColor);
            }

            img {
                width: 60px;
                height: 60px;
            }
        }

        .visiable {
            overflow: hidden;
            height: 159px;
            transition: all 0.3s;

            a {
                padding: 0 30px;
            }
        }

        a {
            display: block;
            display: flex;
            align-items: center;
            height: 45px;
            text-decoration: none;
            color: var(--myColor);
            margin: 6px 0;
            border-radius: 5px;
            padding: 0 10px;

            &:active {
                background-color: rgba(0, 0, 0, 0.1);
            }

            span {
                margin-left: 10px;
            }
        }
    }
}

:global(.el-drawer) {
    background-color: var(--myBackgroudColor) !important;
}
</style>


