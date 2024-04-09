<template>
<div class="user-card-wrapper">
  <LoginModal v-if="showLoginModal" @close="showLoginModal = false"/>
  <div v-if="isLoggedIn" class="user-card">
    <img class="user-thumbnail" :src="userThumbnail" alt="User thumbnail" />
    <div class="user-info">
      <div class="user-link"><a :href="`/user/test`" @click.prevent="goToUserPage()">{{user.username}}</a></div>
      <div class="user-link"><a :href="`/user/test`" @click.prevent="goToUserPage()">{{user.id}}</a></div>
    </div>
  </div>
  <div v-else>
    <button @click="openLoginModal()">Login</button>
    <button @click="createNewGuest()">Sign in as Guest</button>
  </div>
</div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';
import defaultThumbnail from '@/assets/default-user-thumbnail.png';
import loginApi from '@/api/loginApi';
import userLogin from '@/api/userLogin'

export default {
  name: 'UserCard',
  components: {
    LoginModal,
  },
  data() {
    return {
      showLoginModal: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isLoggedIn() {
      return this.$store.getters.getIsLoggedIn
    },
    userThumbnail() {
      return this.user.thumbnail || defaultThumbnail || null;
    },
  },
  methods: {
    goToUserPage() {
      this.$router.push({ path: `/user/${this.user.id}`});
    },
    openLoginModal() {
      this.showLoginModal = true;
    },
    async createNewGuest() {
      await userLogin.createNewGuest()
    },
  },
};
</script>
<style scoped>
.user-card {
  display: flex;
  height: 100%;
  align-items: center;
}
.user-info  {
  margin-left: 20px;
}
.user-thumbnail {
  height: 100%;
  width: 40px;
  border-radius: 50%;
}
.user-link {
  margin: 10px 0;
}
.logout-button {
  margin-left: 10px;
}
</style>
```