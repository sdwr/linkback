<template>
<div>
  <div v-if="!isOnMobile" class="main-container-desktop">
    <div class="page-header">
      <h1>{{ siteTitle }}</h1>
      <div class="page-header-buttons">
        <button @click="goToLanding">Home</button>
        <button @click="goToDebug">Debug</button>
        <button @click="goToCreateLink">Create Link</button>
      </div>
    </div>
    <div class="page-title">
      <h1>{{ pageTitle }}</h1>
    </div>
    <div class="user-card">
      <UserCard :user="user" />
    </div>
  </div>
  <div v-else class="main-container-mobile">
    <div class="page-header">
      <h1>{{ siteTitle }}</h1>
      <div class="page-header-buttons">
        <button @click="goToLanding">Home</button>
        <button @click="goToDebug">Debug</button>
        <button @click="goToCreateLink">Create Link</button>
      </div>
      <div class="user-card-mobile">
        <UserCard :user="user" />
      </div>
    </div>
    <div class="page-title-mobile">
      <h1>{{ pageTitle }}</h1>
    </div>
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
    isOnMobile() {
      return this.$store.getters.getIsOnMobile
    },
    user() {
      return this.$store.getters.getUser || {}
    },
    pageTitle() {
      return this.$store.getters.getPageTitle
    },
  },
  data() {
    return {
      siteTitle: 'Linkback'
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
/* different version of header for desktop vs mobile */
.main-container-desktop {
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
  width: 100%;
  justify-content: space-between;
}

.page-header-buttons {
  display: flex;
  margin-left: 10px;
  gap: 10px; /* Adds some space between buttons */
}

.page-title {
  flex-grow: 1;
}

.user-card {
  /* Additional styling for the user card */
}

/* mobile version */
/* put the page title below the site buttons */
.main-container-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title-mobile {

}
</style>