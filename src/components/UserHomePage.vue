<template>
  <div class="user-home">
    <div><a :href="`/`">Back to Home</a></div>
    <h1>{{ user.username }}</h1>
    <div class="sections">
      <div class="section">
        <h2>User History</h2>
        <ul>
          <li v-for="historyItem in userHistory" :key="historyItem.id">{{ historyItem.action }}</li>
        </ul>
      </div>
      <div class="section">
        <h2>Submitted Links</h2>
        <ul>
          <li v-for="link in submittedLinks" :key="link.id">{{ link.title }}</li>
        </ul>
      </div>
      <div class="section">
        <h2>Saved Links</h2>
        <ul>
          <li v-for="link in savedLinks" :key="link.id">{{ link.title }}</li>
        </ul>
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
      },
      userHistory: [],
      submittedLinks: [],
      savedLinks: [],
    }
  },
  async created() {
    // Fetch the user data from the API
    let id = this.$route.params.id;
    id = parseInt(id);
    this.user = await api.getUser(id);
    // Fetch the user history
    this.userHistory = await api.getUserHistory(id);

    // Fetch the submitted links
    this.submittedLinks = await api.getLinksByUser(id);

    // Fetch the saved links
    this.savedLinks = await api.getSavedLinksByUser(id);

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
