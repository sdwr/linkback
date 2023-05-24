import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './components/LinkPage'
import LandingPage from './components/LandingPage'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: LandingPage, name: 'landingpage' },
    { path: '/link/:id', component: HomePage, name: 'linkpage' }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
