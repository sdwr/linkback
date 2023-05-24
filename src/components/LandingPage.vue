<template>
  <div class="landing-page">
    <div class="add-link">
      <input v-model="newLink" type="url" placeholder="Paste a URL here..." />
      <button @click="addLink">Add Link</button>
    </div>
    <div class="top-links">
      <h2>Top Links</h2>
      <div v-for="link in topLinks" :key="link.id">
        <a :href="link.url">{{link.url}}</a>
        <!-- Add a voting component here -->
        <!-- Add a link to the HomePage of this link here -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newLink: '',
      topLinks: []
    }
  },
  methods: {
    addLink() {
      // Code to add the link
    }
  },
  created() {
    // Code to fetch the top links from the server
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