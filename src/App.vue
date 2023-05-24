<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import VueRouter from 'vue-router';
import HomePage from './components/HomePage.vue';
import LandingPage from './components/LandingPage.vue';

const routes = [
  { path: '/link/:id', component: HomePage, name: 'homepage' },
  { path: '/', component: LandingPage, name: 'landingpage' }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
