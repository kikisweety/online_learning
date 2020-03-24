import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon-font/iconfont.css'
import echarts from 'echarts'
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
