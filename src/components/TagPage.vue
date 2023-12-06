<template>
  <div class="linkpage">
  <button @click="backToHome"> &lt; Back</button>
  <h1>{{currentTagName}}</h1>
    <div class="main-content">
      <div class="links">
        <h2>Links</h2>
        <!-- List of links here -->
        <div v-for="link in links" :key="link.id">
          {{link.url}}
          <VoteButton :link-id="link.id"></VoteButton>
          <!-- Voting component for each link -->
        </div>
      </div>
      <div class="other-links">
        <h2>Add a link</h2>
        <!-- Form to add a new link to the tag -->
        <form @submit.prevent="addTag">
            <input type="text" v-model="newTagName" @keyup.enter="addTag" placeholder="Enter new tag name">
            <button type="submit" @click="addTag">Add Tag</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import VoteButton from '@/components/VoteButton.vue'
import api from '@/api';

export default {
  components: {
    VoteButton
  },
  data() {
    return {
      currentTagName: "",
      newTagName: "",
      links: [],
    }
  },
  methods: {
    async addTag() {
      if(this.newTagName && this.newTagName.length > 0) {
        await api.mockAddTag(this.newTagName)
        this.newTagName = ''
        this.tags = await api.mockGetTags()
      }
      console.log(this.tags)
    },
    async loadLinks() {
      this.links = await api.mockGetLinksByTag(this.currentTagName)
    },
    backToHome() {
      this.$router.push({ path:"/"})
    }
  },
  created() {
    if(this.$route.params.tag) {
      this.currentTagName = this.$route.params.tag
      this.loadLinks()
    }
  },
  mounted() {
  }
}
</script>


<style scoped>
.linkpage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-preview {
  margin: 20px;
  border: 1px solid #ccc;
  width: 80%;
  height: 500px;
  overflow: auto;
}

.main-content {
  display: flex;
  width: 80%;
  justify-content: space-between;
}

.comments, .other-links {
  border: 1px solid #ccc;
  padding: 10px;
  width: 45%;
  height: auto;
  overflow: auto;
}

.vote-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
}
</style>


