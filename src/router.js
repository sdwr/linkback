import { createRouter, createWebHistory } from 'vue-router'
import LinkPage from './components/LinkPage'
import LandingPage from './components/LandingPage'
import TagPage from './components/TagPage'
import UserHomePage from './components/UserHomePage'
import YoutubePage from './components/YoutubePage'

const routes = [
    { path: '/', component: LandingPage, name: 'landingpage' },
    { path: '/link/:id',  component: LinkPage, name: 'linkpageid'},
    { path: '/tube/:id', component: YoutubePage, name: 'youtubepageid'},
    { path: '/tag/:id', component: TagPage, name: 'tagpage'},
    { path: '/user/:id', component: UserHomePage, name: 'userpage'},
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
