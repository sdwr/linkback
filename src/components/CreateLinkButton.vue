<template>
  <div class="create-link-button" @click="goToCreateLink">
    <img class="create-link-button-icon" :src="image" alt="Create link" />
    <div>Create Link</div>
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
  cursor: pointer;
  border: 1px solid black;
  background-color: lightgreen;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px;
  width: 100px;
  height: 30px;

}
.create-link-button-icon {
  width: 40px;
  height: 100%;
}
</style>
