import Vue from 'vue'
import axios from 'axios'
import $index from './common/less/index.less'
import '../static/css/reset.css'
import App from './App.vue'
import router from './router/index'

Vue.prototype.$index = $index

axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
