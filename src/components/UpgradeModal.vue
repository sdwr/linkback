<template>
  <div class="upgrade-guest-container">
    <div class="upgrade-guest-form">
      <button class="close-button" @click="close()">X</button>
      <h1>Register account:</h1>
      <form class="upgrade-guest-fields" @submit.prevent="upgradeGuest">
        <input class="upgrade-guest-input" type="email" placeholder="Email" v-model="email">
        <input class="upgrade-guest-input" type="password" placeholder="Password" v-model="password">
        <input class="upgrade-guest-input" type="password" placeholder="Confirm Password" v-model="confirmPassword">
        <div class="error-messages">
          <div v-if="!emailIsValid">Email is not valid</div>
          <div v-if="!passwordIsValid">Password must be at least 6 characters</div>
          <div v-if="!passwordsMatch">Passwords do not match</div>
        </div>
        <button class="upgrade-guest-button" :disabled="submitDisabled" type="submit">Register</button>
      </form>
    </div>
  </div>
</template>
<script>
import api from '@/api.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    emailIsValid() {
      let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
      return this.email.length > 0 && emailRegex.test(this.email);
    },
    passwordIsValid() {
      return this.password.length >= 6;
    },
    passwordsMatch() {
      return this.password === this.confirmPassword;
    },
    submitDisabled() {
      return !(this.emailIsValid && this.passwordIsValid && this.passwordsMatch);
    }
  },
  methods: {
    async upgradeGuest() {
      let userDto = {
        email: this.email,
        password: this.password,
        id: this.user.id,
      }
      let user = await api.upgradeGuestUser(userDto);
      if (!user) {
        alert('Email already in use (or registration failed)');
        return;
      }
      this.$store.dispatch('saveUser', user);
      this.$emit('upgrade');
      this.$emit('close');
    },
    close() {
    }
  }
}

</script>
<style scoped>
.upgrade-guest-container {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.upgrade-guest-form {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 5px;
  border: 1px solid #888;
  width: 80%;
}
.upgrade-guest-fields {
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