import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

// Create the Vue app and use the router
const app = createApp(App);
app.use(router);
app.use(store);
app.use(ToastPlugin);
app.mount('#app');
