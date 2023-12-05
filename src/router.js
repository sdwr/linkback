import { createRouter, createWebHistory } from 'vue-router'
import LinkPage from './components/LinkPage'
import LandingPage from './components/LandingPage'

const routes = [
    { path: '/', component: LandingPage, name: 'landingpage' },
    { path: '/link', component: LinkPage, name: 'linkpage', props: true},
    { path: '/link/:url',  component: LinkPage, name: 'linkpageurl'},
    { path: '/link/:pathMatch(.*)*',  component: LinkPage, name: 'linkpageall'},
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
