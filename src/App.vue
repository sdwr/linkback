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
    this.$store.dispatch('loadUser');
    
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
  margin-top: 20px;
}
</style>
