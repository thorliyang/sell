import Vue from 'vue'
import axios from 'axios'
import Velocity from 'velocity-animate'
import store from './store'
import router from './router'
import './common/less/index.less'
import '../static/css/reset.css'
import App from './App.vue'

axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios

Vue.prototype.velocity = Velocity


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router, store
}).$mount('#app')
