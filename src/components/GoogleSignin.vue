<template>
  <div id="g_id_onload"
      data-client_id="1078294452749-9a01cctu094i3v8p61u0uat7qk8ttu74.apps.googleusercontent.com"
      data-callback="handleCredentialResponse"
      data-login_uri="localhost:8081"
      data-auto_prompt="false">
  </div>
  <div class="g_id_signin"
      data-type="standard"
      data-size="large"
      data-theme="outline"
      data-text="sign_in_with"
      data-shape="rectangular"
      data-logo_alignment="left">
  </div>
  <div>
    <input type="text" v-model="username" placeholder="Enter your username" />
    <button @click="fakeGoogleSignin(username)">Test Sign In</button>
  </div>
</template>

<script>
import api from '@/api.js';

export default {
  data() {
    return {
      username: '',
    }
  },
  methods: {
    async fakeGoogleSignin(username) {
      let userData = {username: username, email: "test@test.com"}
      let user = await api.addUser(userData)

      this.$store.commit('setUser', user);
    },
    handleCredentialResponse(response) {
      console.log(response)
    },
  },
  mounted() {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://accounts.google.com/gsi/client')
    script.setAttribute('async', true)
    script.setAttribute('defer', true)
    document.head.appendChild(script)
  }
}
</script>

<style scoped>
</style>