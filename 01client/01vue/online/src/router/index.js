import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
Vue.use(Router)

// const routes = [
//     { path: 'index', component: Index },
//     { path: '/', redirect: '/index' }
// ]
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: Index
        }
    ]
})