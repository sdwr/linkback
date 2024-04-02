import { createRouter, createWebHistory } from 'vue-router'
import LinkPage from './components/LinkPage.vue'
import LandingPage from './components/LandingPage.vue'
import TagPage from './components/TagPage.vue'
import UserHomePage from './components/UserHomePage.vue'

import CreateLinkPage from './components/CreateLinkPage.vue'

import DebugPage from './components/DebugPage.vue'

const routes = [
    { path: '/', component: LandingPage, name: 'landingpage' },
    { path: '/link/:id', component: LinkPage, name: 'linkpage'},
    { path: '/tag/:id', component: TagPage, name: 'tagpage'},
    { path: '/user/:id', component: UserHomePage, name: 'userpage'},
    
    { path: '/createlink', component: CreateLinkPage, name: 'createlinkpage'},
    { path: '/debug', component: DebugPage, name: 'debugpage'},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
        console.log(`Navigating to ${to.path} from ${from.path}`);
        next();
    }
);

export default router
