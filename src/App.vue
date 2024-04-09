<template>
  <div v-if="isLoggedIn" id="app">
    <PageHeader/>
    <ToastNotification/>
    <router-view :key="$route.path" />
  </div>
  <div v-else>
    Oops! You are not logged in. There is nothing to see here.
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { isOnMobile } from '@/utils'
import userLogin from '@/api/userLogin';

export default {
  name: 'App',
  components: {
    PageHeader,
    ToastNotification,
  },
  computed: {
    storedUser () {
      return this.$store.getters.getUser
    },
    isLoggedIn() {
      return this.$store.getters.getIsLoggedIn
    },
  },
  methods: {
    handleResize() {
      this.$store.dispatch('saveIsOnMobile', isOnMobile())
    },
    async loadUser() {

    },
  },
  created() {
    userLogin.loadUserAndLogin();
    //check if the user is on mobile
    this.$store.dispatch('saveIsOnMobile', isOnMobile())
    
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>@/api/userLogin
