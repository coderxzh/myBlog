<template>
    <ul>
        <li v-for="(item, index) in backLog" :key="item.path" @click="toActive(item.path)">
            <span>{{ item.title }}</span>
            <i class="iconfont icon-chahao" @click.prevent="remove(index)"></i>
        </li>
    </ul>
</template>
 
 
<script lang='ts' setup>
import { reactive, watch } from "vue"
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
interface Item {
    title: string;
    path: string
}
let backLog = reactive<Array<Item>>([])
const addItem = (obj: Item) => {
    if (obj.path) {
        let value = backLog.find((item) => item.path == obj.path)
        if (value == undefined) {
            backLog.push(obj)
        }
        return
    }
    return
}
const toActive = (path: string) => {
    router.push(path)
}
const remove = (index: number) => {
    if (index) {
        backLog.splice(index, 1)
    }
}
watch(route, (newValue) => {
    addItem(newValue.meta as any)
}, { immediate: true })
</script>

<style lang = 'less' scoped>
ul {
    display: flex;
    align-items: center;

    li {
        position: relative;
        padding: 10px 20px;
        margin: 0 3px;
        border-radius: 5px;
        background-color: var(--bodyBackgroudColor);
        cursor: pointer;

        &:hover i {
            opacity: 1;
        }

        i {
            position: absolute;
            font-size: 18px;
            right: 2px;
            top: 2px;
            opacity: 0;
            transition: all 0.3s;
        }
    }
}
</style>
