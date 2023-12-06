<template>
  <div class="user-home">
    <div><a :href="`/`">Back to Home</a></div>
    <h1>{{ user.username }}</h1>
    <div class="sections">
      <div class="section">
        <h2>User History</h2>
        <ul>
          <li v-for="action in user.history" :key="action.id">{{ action.description }}</li>
        </ul>
      </div>
      <div class="section">
        <h2>Additions</h2>
        <div>
          <h3>Submitted Links</h3>
          <ul>
            <li v-for="link in user.submittedLinks" :key="link.id">{{ link.title }}</li>
          </ul>
          <h3>Submitted Tags</h3>
          <ul>
            <li v-for="tag in user.submittedTags" :key="tag.id">{{ tag.name }}</li>
          </ul>
        </div>
      </div>
      <div class="section">
        <h2>Comments</h2>
        <ul>
          <li v-for="comment in user.comments" :key="comment.id">{{ comment.content }}</li>
        </ul>
      </div>
      <div class="section">
        <h2>New</h2>
        <div>
          <h3>Recent Changes in Liked Links</h3>
          <ul>
            <li v-for="link in recentChanges.links" :key="link.id">{{ link.title }}</li>
          </ul>
          <h3>Recent Changes in Liked Tags</h3>
          <ul>
            <li v-for="tag in recentChanges.tags" :key="tag.id">{{ tag.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      user: {
        username: '',
        history: [],
        submittedLinks: [],
        submittedTags: [],
        comments: []
      },
      recentChanges: {
        links: [],
        tags: []
      }
    }
  },
  async created() {
    // Fetch the user data from the API
    const id = this.$route.params.id;
    const userData = await api.fetchUser(id);
    this.user = userData;

    // Fetch recent changes
    const recentChangesData = await api.fetchRecentChanges(this.user.id);
    this.recentChanges = recentChangesData;
  }
}
</script>

<style scoped>
.user-home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sections .section {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
