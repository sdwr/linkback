<template>
<div class="user-card-wrapper">
  <div v-if="isLoggedIn" class="user-card">
    <img class="user-thumbnail" :src="userThumbnail" alt="User thumbnail" />
    <div class="user-info">
      <div class="user-link"><a :href="`/user/test`" @click.prevent="goToUserPage()">{{user.username}}</a></div>
      <div class="user-link"><a :href="`/user/test`" @click.prevent="goToUserPage()">{{user.id}}</a></div>
    </div>
    <button class="logout-button" @click="logout">Logout</button>
  </div>
  <div v-else>
    <button @click="login()">Login</button>
    <button @click="createNewGuest()">Sign in as Guest</button>
  </div>
</div>
</template>

<script>
import defaultThumbnail from '@/assets/default-user-thumbnail.png';
import loginApi from '@/api/loginApi';
import userLogin from '@/api/userLogin'

export default {
  name: 'UserCard',
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
    login() {
      //popup login modal
    },
    async createNewGuest() {
      await userLogin.createNewGuest()
    },
    async logout() {
      await loginApi.logout(this.user);
      this.$store.dispatch('saveUser', null)
      this.$store.dispatch('saveUserCredentials', null)
      this.$store.dispatch('saveIsLoggedIn', false)
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