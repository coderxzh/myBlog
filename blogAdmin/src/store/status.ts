import {defineStore} from "pinia"
export const useStatus =  defineStore({
    id:"status",
    state:()=>{
        return {
            isDark:false,
            showDrawer:false
        }
    },
    getters:{},
    actions:{}
})