<template>
  <div class="user-home">
    <div class="user-title">
      <EditTextField :value="user.username" :canEdit="canEdit" @edit="onChangeName"></EditTextField>
      <button v-if="canUpgrade" @click="showUpgradeModal = true">Upgrade</button>
      <UpgradeModal v-if="showUpgradeModal" @close="showUpgradeModal = false"></UpgradeModal>
    </div>
    <div class="sections">
      <div class="section-container">
        <div class="section-header" @click.stop="collapseHistory">
          <h2>History</h2>   
          <i class="fas fa-chevron-down" :class="{'fa-chevron-up': showHistory, 'fa-chevron-down': !showHistory}"></i>
        </div>
        <div v-if="showHistory" class="section">
          <a v-for="historyItem in userHistory" @click="goToItem(historyItem)" :href="''">{{ historyItem.actionType }}</a>
        </div>
      </div>
      <div class="section-container">
        <div class="section-header" @click.stop="collapseSubmitted">
          <h2>Submitted Links</h2>
          <i class="fas fa-chevron-down" :class="{'fa-chevron-up': showSubmitted, 'fa-chevron-down': !showSubmitted}"></i>
        </div>
        <div class="section" v-if="showSubmitted">
          <LinkItem v-for="link in submittedLinks" v-bind:key="link.id" :link="link" :hasVoting="false"
            @onClick="goToLink"
            @onSave="saveLink"
            @onUnsave="unsaveLink"
          ></LinkItem>
        </div>
      </div>
      <div class="section-container">
        <div class="section-header" @click.stop="collapseSaved">
          <h2>Saved Links</h2>
          <i class="fas fa-chevron-down" :class="{'fa-chevron-up': showSaved, 'fa-chevron-down': !showSaved}"></i>
        </div>
        <div class="section" v-if="showSaved">
          <LinkItem v-for="link in savedLinks" v-bind:key="link.id" :link="link" :hasVoting="false"
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
import EditTextField from '@/components/EditTextField.vue';
import UpgradeModal from '@/components/UpgradeModal.vue';

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
      showUpgradeModal: false,

      showHistory: true,
      showSubmitted: true,
      showSaved: true,
    }
  },
  components: {
    LinkItem,
    EditTextField,
    UpgradeModal,
  },
  computed: {
    storedUser () {
      return this.$store.getters.getUser
    },
    canEdit() {
      return this.user.id === this.storedUser.id && !this.storedUser.isGuest;
    },
    canUpgrade() {
      return this.user.id === this.storedUser.id && this.storedUser.isGuest;
    }
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
    async onChangeName(newName) {
      this.user.username = newName;
      await api.updateUser({ id: this.user.id, username: newName });
      // user already saved to store
      // reload the user data
      this.user = await api.getUser(this.user.id);
    },
    goToLink(link) {
      this.$router.push({ path: `/link/${link.id}`})
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
    async collapseHistory(event) {
      const header = event.currentTarget;
      header.classList.toggle('expanded');
      this.showHistory = !this.showHistory;
    },
    async collapseSubmitted(event) {
      const header = event.currentTarget;
      header.classList.toggle('expanded');
      this.showSubmitted = !this.showSubmitted;
    },
    async collapseSaved(event) {
      const header = event.currentTarget;
      header.classList.toggle('expanded');
      this.showSaved = !this.showSaved;
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

.user-title {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;

}

.sections .section-container {
  border: 1px solid #ccc;
  padding: 10px;
}
.section {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
.section-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

}
.history-items a {
  display: block;
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
