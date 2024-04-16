<template>
  <div class="create-link-card">
    <div class="create-link-card-content">
      <h2>Create a new link:</h2>
      <form @submit.prevent="createLink">
        <div class="create-link-card-buttons">
          <input type="text" v-model="url" placeholder="URL" />
          <input type="text" v-model="title" placeholder="Title (optional)" />
          <button type="submit" :disabled="disableCreateLink">Create Link</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      url: '',
      title: '',
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    disableCreateLink() {
      return !this.url  || !this.user.id
    }
  },
  methods: {
    async createLink() {
      let newLink = {
        title: this.title,
        url: this.url,
        userId: this.user.id
      }
      let link = await api.addLink(newLink)
      if(link) {
        this.goToLink(link)
      }
    },
    goToLink(link) {
      this.$router.push({ path: `/link/${link.id}`})
    }
  }
}


</script>
<style scoped>
.create-link-card {
  display: flex;
  width: 100%;
  justify-content: space-between; /* This spreads out the children to each end */
  align-items: center; /* This ensures they are aligned in the center vertically */
  margin-bottom: 20px;
}
.create-link-card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.create-link-card-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.create-link-card-buttons input {
  margin: 5px 10px;
}
</style>