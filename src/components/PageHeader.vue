<template>
<div class="main-container">
  <div class="page-header">
    <h1>{{ title }}</h1>
    <div class="page-header-buttons">
      <button @click="goToLanding">Home</button>
      <button @click="goToDebug">Debug</button>
      <button @click="goToCreateLink">Create Link</button>
    </div>
  </div>
  <div class="user-card">
    <UserCard :user="user" />
  </div>
</div>

</template>

<script>
import UserCard from '@/components/UserCard.vue'
import { mapGetters } from 'vuex'
import api from '@/api'

export default {
  components: {
    UserCard
  },
  computed: {
    user() {
      return this.$store.getters.getUser || {}
    }
  },
  data() {
    return {
      title: 'Page Header'
    }
  },
  methods: {
    goToLanding() {
      this.$router.push('/')
    },
    goToDebug() {
      this.$router.push('/debug')
    },
    goToCreateLink() {
      this.$router.push('/createLink')
    }
  }
}
</script>
<style scoped>
.main-container {
  display: flex;
  width: 100%;
  height: 100px;
  overflow: hidden;
  justify-content: space-between; /* This spreads out the children to each end */
  align-items: center; /* This ensures they are aligned in the center vertically */
  margin-bottom: 20px;
}

.page-header {
  display: flex;
  align-items: center;
  width: 100%; /* Make sure the header takes up all available space */
}

.page-header-buttons {
  display: flex;
  margin-left: 40px;
  gap: 10px; /* Adds some space between buttons */
}

.user-card {
  /* Additional styling for the user card */
}
</style>