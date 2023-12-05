import { createApp } from 'vue';
import router from './router';
import LandingPage from './components/LandingPage';

// Create the Vue app and use the router
const app = createApp(LandingPage);
app.use(router);
app.mount('#app');
