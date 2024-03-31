<template>
  <div class="user-home">
    <div class="user-title">
      <EditTextField :value="user.username" :canEdit="canEdit" @edit="onChangeName"></EditTextField>
      <button v-if="canUpgrade" @click="showUpgradeModal = true">Upgrade</button>
      <UpgradeModal v-if="showUpgradeModal" @close="showUpgradeModal = false"></UpgradeModal>
    </div>
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
      await api.updateUser({ id: this.user.id, username: newName });
      // reload the user data
      this.user = await api.getUser(this.user.id);
      // relload the user in the store
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
    // update when auth is implemented
    userIsOwner() {
      return false;
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
