import Vue from 'vue'
import Vuex from 'vuex'
import { fetchDate } from '../api'
import urlParse from '../common/js/util'
import food from './modules/food'

Vue.use(Vuex);

const ERR_OK = 0;

const store = new Vuex.Store({
    modules: {
        food
    },
    state: {
        seller: {
            id: (() => {
                let queryParam = urlParse()
                return queryParam.id
            })()
        },
        goods: [],
        ratings: [],
        selectFoods: [],
        cartcontrolAnimate: [
            {
                show: false
            },
            {
                show: false
            },
            {
                show: false
            },
            {
                show: false
            },
            {
                show: false
            }
        ],
        dropCartcontrolAnimate: [],
    },
    mutations: {
        loadSeller(state, payload) {
            state.seller = Object.assign({}, state.seller, payload.seller)
        },
        loadGoods(state, payload) {
            state.goods = payload.goods
        },
        loadRatings(state, payload) {
            state.ratings = payload.ratings
        },
        modifSelectFoods(state) {
            let foods = []
            state.goods.forEach(good => {
                good.foods.forEach(food => {
                    if (food.count) {
                        foods.push(food)
                    }
                })
            })
            state.selectFoods = foods
        },
        addCartcontrolAnimate(state, payload) {
            let temporaryArr = state.dropCartcontrolAnimate
            for (let i = 0, le = state.cartcontrolAnimate.length; i < le; i++) {
                let cart = state.cartcontrolAnimate[i]
                if (!cart.show) {
                    cart.show = true
                    cart.el = payload.element
                    temporaryArr.push(cart)
                    state.dropCartcontrolAnimate = temporaryArr
                    return
                }
            }
        },
        removeCartcontrolAnimate(state) {
            let temporaryArr = state.dropCartcontrolAnimate
            let ball = temporaryArr.shift()
            state.dropCartcontrolAnimate = temporaryArr
            if (ball) {
                ball.show = false
            }
        },
    },
    actions: {
        getSeller({ state, commit }) {
            const req = fetchDate('seller?id=' + state.seller.id)
            req.then(resp => {
                resp = resp.data
                if (resp.errno === ERR_OK) {
                    commit('loadSeller', {
                        seller: resp.data
                    })
                }
            })
        },
        getGoods({ commit }) {
            const req = fetchDate('goods')
            req.then(resp => {
                resp = resp.data
                if (resp.errno === ERR_OK) {
                    commit('loadGoods', {
                        goods: resp.data
                    })
                }
            })
        },
        getRatings({ commit }, options) {
            const req = fetchDate('ratings')
            req.then(resp => {
                resp = resp.data
                if (resp.errno === ERR_OK) {
                    commit('loadRatings', {
                        ratings: resp.data
                    })
                    options.fn()
                }
            })
        }
    }
})

export default store