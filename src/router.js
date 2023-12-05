import { createRouter, createWebHistory } from 'vue-router'
import LinkPage from './components/LinkPage'
import LandingPage from './components/LandingPage'

const routes = [
    { path: '/', component: LandingPage, name: 'landingpage' },
    { path: '/link/:id', component: LinkPage, name: 'linkpage' }
]

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

export default router
