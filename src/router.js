import { createRouter, createWebHistory } from 'vue-router'
import LinkPage from './components/LinkPage'
import LandingPage from './components/LandingPage'
import TagPage from './components/TagPage'
import UserHomePage from './components/UserHomePage'
import YoutubePage from './components/YoutubePage'

const routes = [
    { path: '/', component: LandingPage, name: 'landingpage' },
    { path: '/link', component: LinkPage, name: 'linkpage', props: true},
    { path: '/link/:url',  component: LinkPage, name: 'linkpageurl'},
    { path: '/link/:pathMatch(.*)*',  component: LinkPage, name: 'linkpageall'},
    { path: '/tube', component: YoutubePage, name: 'youtubepage', props: true},
    { path: '/tube/:url', component: YoutubePage, name: 'youtubepageurl'},
    { path: '/tube/:pathMatch(.*)*', component: YoutubePage, name: 'youtubepageall'},
    { path: '/tag/:tag', component: TagPage, name: 'tagpage'},
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
