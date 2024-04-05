<template>
  <div class="login-container">
    <div class="login-form">
      <button class="close-button" @click="close()">X</button>
      <h1>Login:</h1>
      <form class="login-fields" @submit.prevent="login">
        <input class="login-input" type="email" placeholder="Email" v-model="email">
        <input class="login-input" type="password" placeholder="Password" v-model="password">
        <button class="login-button" :disabled="submitDisabled" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>
<script>
import api from '@/api.js';
import userLogin from '@/api/userLogin.js';

export default {
  name: 'LoginModal',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    submitDisabled() {
      return !(this.email && this.password);
    }
  },
  methods: {
    async login() {
      let userCredentials = {
        email: this.email,
        password: this.password,
      }

      await this.$store.dispatch('saveUserCredentials', userCredentials);
      
      //try to login with new credentials
      let successfulLogin = await userLogin.loginWithCredentials(userCredentials);
      if (successfulLogin) {
        this.$emit('login');
        this.close();
      } else {
        // show error toast in api instead
      }
    },
    close() {
      this.$emit('close');
    },
  }
}

</script>
<style scoped>
.login-container {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.login-form {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 5px;
  border: 1px solid #888;
  width: 80%;
}
.login-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.error-messages {
  color: red;
}

/* The Close Button */
.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
</style>