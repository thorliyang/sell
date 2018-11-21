import Vue from 'vue'
import Vuex from 'vuex'
import { fetchDate } from '../api'

Vue.use(Vuex);

const ERR_OK = 0;

const store = new Vuex.Store({
    state: {
        seller: {},
        goods: []
    },
    mutations: {
        loadSeller(state, payload) {
            state.seller = payload.seller
        },
        loadGoods(state, payload) {
            state.goods = payload.goods
        },
    },
    actions: {
        getSeller ({ commit }) {
            const req = fetchDate('seller')
            req.then(resp => {
                resp = resp.data
                if (resp.errno === ERR_OK) {
                    commit('loadSeller', {
                        seller: resp.data
                    })
                }
            })
        },
        getGoods ({ commit }, options) {
            const req = fetchDate('goods')
            req.then(resp => {
                resp = resp.data
                if (resp.errno === ERR_OK) {
                    commit('loadGoods', {
                        goods: resp.data
                    })
                    options.fn()
                }
            })
        }
    }
})

export default store