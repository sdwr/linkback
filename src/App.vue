<template>
  <div id="app">
  <PageHeader/>
  <router-view :key="$route.path" />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import { isOnMobile } from '@/utils'

export default {
  name: 'App',
  components: {
    PageHeader,
  },
  methods: {
    handleResize() {
      this.$store.dispatch('saveIsOnMobile', isOnMobile())
    }
  },
  created() {
    //load user from local storage, if it exists 
    this.$store.dispatch('loadUser');
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
</style>
