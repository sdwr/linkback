<template>
  <div class="landing-page">
    <div class="add-link">
      <input v-model="newLink" type="url" placeholder="Paste a URL here..." />
      <button @click="addLink">Add Link</button>
    </div>
    <div class="top-links">
      <h2>Top Links</h2>
      <div v-for="link in topLinks" :key="link.id">
        <a :href="`/link/${link.id}`" @click.prevent="goToLink(link.id)">{{link.url}}</a>
        <!-- Add a voting component here -->
        <!-- Add a link to the HomePage of this link here -->
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      newLink: '',
      topLinks: []
    }
  },
  methods: {
    async addLink() {
      if(this.newLink && this.newLink.length > 0) {
        await api.mockAddLink(this.newLink)
        await this.getLinks()
      }
    },
    async getLinks() {
      api.mockGetLinks().then(links => {
        this.topLinks = links
      })
    },
    goToLink(linkId) {
      this.$router.push({path: `/link/${linkId}`})
    }
  },
  created() {
    this.getLinks();
  }
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-link {
  margin: 20px;
  display: flex;
  justify-content: center;
}

.top-links {
  width: 80%;
}

.top-links > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
</style>