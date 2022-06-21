import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from "./router"
import axios from "axios"
import store from "./store"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/iconfont/iconfont.css"
import Mui from 'vue-awesome-mui';
Vue.use(Mui);
Vue.use(ElementUI);
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')