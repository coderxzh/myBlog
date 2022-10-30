<template>
    <div class="top">
    </div>
    <div class="friends">
        <Card v-for="item in initData.list" :data="item"></Card>
    </div>
    <div class="add">
        <i class="iconfont icon-jiahao2fill"> </i>
    </div>

</template>

<script lang='ts' setup>
import Card from '@/components/commen/Card.vue';
import { reactive } from 'vue';
interface Props {
    url: string,
    name: string,
    describe: string
}
interface DataList {
    list: Array<Props>
}
let initData = reactive({} as DataList)
initData.list = ([{ url: "https://www.yevpt.com/logo.jpg", name: "TYPE", describe: "哈哈哈哈哈哈哈" },
{ url: "https://www.yevpt.com/logo.jpg", name: "TYPE", describe: "哈哈哈哈哈哈哈" }, { url: "https://www.yevpt.com/logo.jpg", name: "TYPE", describe: "哈哈哈哈哈哈哈" }, { url: "https://www.yevpt.com/logo.jpg", name: "TYPE", describe: "哈哈哈哈哈哈哈" }])

</script>
 

<style lang = 'less' scoped>
.friends {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 16px;
}

.add {
    position: absolute;
    right: 20px;
    top: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;

    i {
        font-size: 50px;
        color: #614ad3;
    }
}
</style>
