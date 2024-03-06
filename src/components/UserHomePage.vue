<template>
  <div class="user-home">
    <div><a :href="`/`" @click.prevent="goBack">Go back</a></div>
    <h1>{{ user.username }}</h1>
    <div class="sections">
      <div class="section">
        <h2>User History</h2>
        <ul>
          <li v-for="historyItem in userHistory" :key="historyItem.id">{{ historyItem.actionType }}</li>
        </ul>
      </div>
      <div class="section">
        <h2>Submitted Links</h2>
        <div v-for="link in submittedLinks" :key="link.id">
          <LinkItem :link="link" 
            @onClick="goToLink"
            @onSave="saveLink"
            @onUnsave="unsaveLink"
          ></LinkItem>
        </div>
      </div>
      <div class="section">
        <h2>Saved Links</h2>
        <div v-for="link in savedLinks" :key="link.id">
          <LinkItem :link="link" 
            @onClick="goToLink"
            @onSave="saveLink"
            @onUnsave="unsaveLink"
          ></LinkItem>
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
    async saveLink(link) {
      await api.saveLink(this.user.id, link.id);
      await this.loadLinks();
    },
    async unsaveLink(link) {
      await api.unsaveLink(this.user.id, link.id);
      await this.loadLinks();
    },
    goToLink(link) {
      if(link.domain === 'youtube.com') {
        this.$router.push({ path: `/tube/${link.id}`})
      } else {
        this.$router.push({ path: `/link/${link.id}`})
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    async loadLinks() {
      this.userHistory = await api.getUserActionsByUser(this.user.id);
      this.submittedLinks = await api.getSubmittedLinksWithUserData(this.user.id);
      this.savedLinks = await api.getSavedLinksWithUserData(this.user.id);
    },
  },
  async created() {
    // Fetch the user data from the API
    let id = this.$route.params.id;
    id = parseInt(id);
    this.user = await api.getUser(id);
    // Fetch the user history

    await this.loadLinks();

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
