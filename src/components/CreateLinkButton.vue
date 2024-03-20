<template>
  <div class="create-link-button">
    <img class="create-link-button-icon" @click="goToCreateLink" :src="image" alt="Create link" />
  </div>
</template>
<script>
import createLinkImage from '@/assets/plus-icon-cropped.webp'
export default {
  name: 'CreateLinkButton',
  data() {
    return {
      image: createLinkImage
    }
  },
  methods: {
    goToCreateLink() {
      this.$router.push({ path: '/createlink' })
    }
  }
}
</script>
<style scoped>
.create-link-button {
  width: 100px;
  height: 75px;
}
.create-link-button-icon {
  height: 100%;
}
</style>
