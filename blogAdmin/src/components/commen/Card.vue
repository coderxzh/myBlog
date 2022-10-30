<template>
    <router-link to="#" class="card">
        <img :src="data.url" alt="">
        <div class="card-info">
            <p style="font-size: 18px;color:#409fdf;">{{ data.name }}</p>
            <p style="font-size: 16px;">{{ data.describe }}</p>
        </div>
        <div class="btn">
            <span>编辑</span>
            <span>删除</span>
        </div>
    </router-link>
</template>

<script lang='ts' setup>
import { defineProps } from "vue"
interface Props {
    url: string,
    name: string,
    describe: string
}
let { data } = defineProps<{ data: Props }>()

</script>
<style lang = 'less' scoped>
.card {
    position: relative;
    display: flex;
    align-items: center;
    height: 100px;
    border-radius: 5px;
    padding: 10px;
    background-color: var(--myBackgroudColor);
    box-shadow: var(--myShadow);
    transition: background-color 0.3s;
    text-decoration: none;

    img {
        width: 80px;
        height: 80px;
        border-radius: 5px;
    }

    .card-info {
        display: flex;
        flex-direction: column;

        >p {
            margin: 5px 20px;
            color: var(--myColor);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .btn {
        position: absolute;
        display: flex;
        align-items: center;
        right: 10px;
        bottom: 10px;

        span:last-child {
            color: #f56c6c;
        }

        span:first-child {
            color: #626aef;
        }

        span {
            padding: 0 5px;
        }

    }
}
</style>
