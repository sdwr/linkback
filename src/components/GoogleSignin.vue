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
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
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