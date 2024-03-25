<template>
  <div class="user-home">
    <h1>{{ user.username }}</h1>
    <div class="sections">
      <div class="section">
        <h2>History</h2>
        <div class="history-items">
          <a v-for="historyItem in userHistory" @click="goToItem(historyItem)" :href="''">{{ historyItem.actionType }}</a>
        </div>
      </div>
      <div class="section">
        <h2>Submitted Links</h2>
        <div v-for="link in submittedLinks" :key="link.id">
          <LinkItem :link="link" :hasVoting="false"
            @onClick="goToLink"
            @onSave="saveLink"
            @onUnsave="unsaveLink"
          ></LinkItem>
        </div>
      </div>
      <div class="section">
        <h2>Saved Links</h2>
        <div v-for="link in savedLinks" :key="link.id">
          <LinkItem :link="link" :hasVoting="false"
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
import {ACTION} from '@/consts'
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
    goToItem(userAction) {
      let TAG_ACTIONS = [ACTION.CREATETAG];
      let LINK_ACTIONS = [
        ACTION.SUBMIT, 
        ACTION.EDIT, 
        ACTION.VOTE, 
        ACTION.SAVE, 
        ACTION.UNSAVE, 
        ACTION.TAG, 
        ACTION.UNTAG
      ];
      // Check if the action is a tag action
      if(TAG_ACTIONS.includes(userAction.actionType)) {
        this.$router.push({ path: `/tag/${userAction.itemId}`})
      } else if(LINK_ACTIONS.includes(userAction.actionType)) {
        this.$router.push({ path: `/link/${userAction.itemId}`})
      }
    },
    async loadLinks() {
      this.userHistory = await api.getUserActionsByUser(this.user.id);
      this.submittedLinks = await api.getSubmittedLinksWithUserData(this.user.id);
      this.savedLinks = await api.getSavedLinksWithUserData(this.user.id);
    },
  },
  async created() {
    this.$store.dispatch('savePageTitle', 'User Home');

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
  max-height: 300px;
  overflow-y: auto;
}

.history-items a {
  display: block;
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
