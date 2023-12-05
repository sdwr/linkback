import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

// Create the Vue app and use the router
const app = createApp(App);
app.use(router);
app.mount('#app');
