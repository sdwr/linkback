<template>
<div>
  <div class="main-container">
    <div class="page-header">
      <div class="left-side">
        <span class="page-title" @click="goToLanding()">{{ siteTitle }}</span>
        <div class="page-header-buttons">
          <CreateLinkButton/>
        </div>
      </div>
      <div class="user-card">
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
import CreateLinkButton from './CreateLinkButton.vue'

export default {
  components: {
    UserCard,
    CreateLinkButton,
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
  }
}
</script>
<style scoped>

.page-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.left-side {
  display: flex;
  align-items: center;
}

.page-title {
  font-size: 24px;
  font-style: underline;
  cursor: pointer;

}

.page-header-buttons {
  display: flex;
  margin-left: 20px;
  gap: 10px; /* Adds some space between buttons */
}

.page-title {
  flex-grow: 1;
}

.user-card {
  /* Additional styling for the user card */
}

.main-container {
  display: flex;
  width: 100%;
  height: 50px;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
}

</style>