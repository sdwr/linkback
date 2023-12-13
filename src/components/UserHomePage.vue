<template>
  <div class="user-home">
    <div><a :href="`/`">Back to Home</a></div>
    <h1>{{ user.username }}</h1>
    <div class="sections">
      <div class="section">
        <h2>User History</h2>
        <ul>
          <li v-for="historyItem in userHistory" :key="historyItem.userActionId">{{ historyItem.actionType }}</li>
        </ul>
      </div>
      <div class="section">
        <h2>Submitted Links</h2>
        <div v-for="link in submittedLinks" :key="link.id">
          <LinkItem :link="link" @onClick="goToLink(link)"></LinkItem>
        </div>
      </div>
      <div class="section">
        <h2>Saved Links</h2>
        <div v-for="link in savedLinks" :key="link.id">
          <LinkItem :link="link" @onClick="goToLink(link)"></LinkItem>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import api from '@/api';
import LinkItem from '@/components/LinkItem.vue';

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
  components: {
    LinkItem,
  },
  methods: {
    goToLink(link) {
      console.log(link)
      if(link.domain === 'youtube.com') {
        this.$router.push({ name: 'youtubepage', query: { link: JSON.stringify(link)}})
      } else {
        this.$router.push({ name: 'linkpage', query: { link: JSON.stringify(link)}})
      }
    },
  },
  async created() {
    // Fetch the user data from the API
    let id = this.$route.params.id;
    id = parseInt(id);
    this.user = await api.getUser(id);
    // Fetch the user history
    this.userHistory = await api.getUserActions(id);

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
