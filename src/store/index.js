import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex);
const actions = {
    getMes(context) {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:3000/api/home',
        }).then(res => {
            context.commit('GETMES', res.data.data)

        }).catch(err => {
            console.log(err);
        })
    },
    keyWords(context, value) {
        if (value === '') {
            this.state.filterMes = []
        } else {
            let filterMes = context.state.message.filter((item) => {
                return item.title.toLowerCase().includes(value.toLowerCase())
            })
            context.commit('KEYWORDS', filterMes)
        }
    },
    nextPage(context, {
        category,
        page
    }) {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:3000/api/nextpage',
            params: {
                page,
                category
            }
        }).then(res => {
            context.commit('NEXTPAGE', res.data.data)
        }).catch(err => {
            console.log(err);
        })
    }
}
const mutations = {
    GETMES(state, value) {
        state.message = value
    },
    KEYWORDS(state, value) {
        state.filterMes = value
    },
    NEXTPAGE(state, value) {
        state.nextPage = value
    }
}
const state = {
    message: Array,
    filterMes: Array,
    nextPage: Array
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})