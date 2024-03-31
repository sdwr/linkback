<template>
  <div id="app">
  <PageHeader/>
  <router-view :key="$route.path" />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import { isOnMobile } from '@/utils'
import userLogin from '@/api/userLogin';

export default {
  name: 'App',
  components: {
    PageHeader,
  },
  computed: {
    storedUser () {
      return this.$store.getters.getUser
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
