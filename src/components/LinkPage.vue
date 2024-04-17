<template>
  <div class="linkpage">
    <div class="link-title">
      <EditTextField :value="link.title" :canEdit="canEditTitle" @edit="onChangeTitle"></EditTextField>
    </div>
    <div class="link-top-buttons">
      <button v-if="!userSavedLink" @click="saveToLinks()">Save</button> <!-- Save to links button -->
      <button v-if="userSavedLink" @click="unsaveToLinks()">Unsave</button> <!-- Saved button -->
      <button v-if="linkIsYoutube" @click="restartVideo()">Restart</button>
      <button v-if="userIsOwner" @click="deleteLink()">Delete</button> <!-- Delete button -->
      <DeleteModal v-if="showDeleteModal" :link="link" @close="showDeleteModal = false"></DeleteModal>
      <span class="author-link">
        Added by: <a 
          :href="`/user`" 
          @click.prevent="goToUser(submittingUser.id)">
            {{submittingUser.username}}
        </a>
      </span>
      <div v-if="linkIsClip"> 
        <a v-if="linkIsClip" :href="`/originalVideo`" @click.prevent="goToOriginal()">Original</a> <!-- Link to original video -->
      </div>
      <div v-if="userIsOwner">
        {{link.pageViews?.length}} unique / {{link.totalViews}} total
      </div>
    </div>

    <div v-if="linkIsYoutube" class="content-preview">
      <div class="iframe" id="iframe" v-if="link"></div>
      <PlayerOverlay 
        :isReady="youtubePlayer !== null"
        @play="playVideo()"
      >
      </PlayerOverlay>
    </div>

    <PageEmbedding v-else class="content-preview" :link="link"></PageEmbedding>

    <div v-if="showClipControls" class="clip-controls">
      <!-- Clip Controls -->

      <!-- Range Sliders -->
      <div class="clip-controls-time-controls">
        <input type="range" v-model="clipStart" @input="adjustStartTime" min="0" :max="link.duration" step="1">
        <input class="clip-controls-text-input" type="text" 
          v-model="clipStart" @keyup.enter="adjustStartTime" @blur="adjustStartTime">
      
        <input type="range" v-model="clipEnd" @input="adjustEndTime" :min="0" :max="link.duration" step="1">
        <input class="clip-controls-text-input" type="text" 
          v-model="clipEnd" @keyup.enter="adjustEndTime" @blur="adjustEndTime">
      </div>
      
      <!-- Loop Input-->
      <div>
        <input type="checkbox" v-model="loopClip">
        <label for="loop">Loop</label>
      <button class="create-clip-button" @click="createClip">Create Clip</button>
      </div>

    </div>
    <div v-if="showClipDuration" class="clip-duration">
      <div class="clip-duration-bar" :style="{width: clipProgress + '%'}"></div>
    </div>

    <BottomContent :link="link"></BottomContent> <!-- is fixed to bottom of screen, can be created anywhere -->
  </div>
  
</template>
<script>
import VoteButton from '@/components/VoteButton.vue'
import PlayerOverlay from '@/components/PlayerOverlay.vue'
import EditTextField from './EditTextField.vue'
import PageEmbedding from './PageEmbedding.vue'
import BottomContent from './BottomContent.vue'
import DeleteModal from './DeleteModal.vue'

import api from '@/api';
import { createPlayer, playPlayer, restartPlayer, setStartTime, setEndTime, setLoopTimes, setIsLoop } from '@/youtubeplayerapi';

export default {
  components: {
    VoteButton,
    PlayerOverlay,
    EditTextField,
    PageEmbedding,
    BottomContent,
    DeleteModal,
  },
  data() {
    return {
      youtubePlayer: null,
      link: {
        title: '',
        url: '',
        startTime: 0,
        endTime: 0,
        duration: 0,
        isClip: false,
        loopClip: false,
        originalVideo: null,
        userId: null,
      },
      newTagName: '',
      submittingUser: {
        username: '',
        userId: null,
      },
      isClip: false, // Flag to check if it's the original video
      clipStart: 0, // Start time for the clip
      clipEnd: 0, // End time for the clip
      loopClip: true, // Flag to check if the clip should loop
      creatingClip: false, // Flag to check if the user is creating a clip,
      userSavedLink: false, // Flag to check if the user has saved the link

      // Modal flags
      showDeleteModal: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    clipProgress() {
      return this.$store.getters.getClipProgress || 0;
    },
    canEditTitle() {
      return this.user.id === this.link.userId;
    },
    linkIsYoutube() {
      return this.link && this.link.domain === 'youtube.com';
    },
    linkIsClip() {
      return this.link && this.link.isClip;
    },
    showClipControls() {
      return this.linkIsYoutube && !this.linkIsClip;
    },
    showClipDuration() {
      return this.linkIsClip;
    },
    userIsOwner() {
      return this.user && this.user.id === this.link.userId;
    },
  },
  watch: {
    //doesn't trigger on first load, need to set the value in created as well
    loopClip: function() {
      setIsLoop(this.loopClip);
    },
  },
  methods: {
    async saveToLinks() {
      let result = await api.saveLink(this.user.id, this.link.id);
      if(result) {
        this.userSavedLink = true;
      }
    },

    async unsaveToLinks() {
      let result = await api.unsaveLink(this.user.id, this.link.id);
      if(result) {
        this.userSavedLink = false;
      }
    },

    async deleteLink() {
      this.showDeleteModal = true;
    },

    async createClip() {
      this.creatingClip = true;
      let clip = await api.addLink({
        title: this.link.title,
        url: this.link.url,
        startTime: this.clipStart,
        endTime: this.clipEnd,
        isClip: true,
        loopClip: this.loopClip,
        originalLinkId: this.link.id,
        userId: this.user.id,
      })
      if(clip && clip.id) {
        let tagLink = await api.addTagToLinkSilent(this.user.id, clip.id, 'clip')
      }
      this.creatingClip = false;
      this.goToLink(clip);
    },
    async onChangeTitle(newTitle) {
      await api.updateLink({ id: this.link.id, userId: this.user.id, title: newTitle });
      this.link.title = newTitle;
      await this.loadLink(this.link.id);
    },
    goToLink(link) {
      this.$router.push({ path: `/link/${link.id}`})
    },
    goToUser(id) {
      this.$router.push({ path: `/user/${id}`})
    },
    goToOriginal() {
      this.$router.push({ path: `/link/${this.link.originalLinkId}`})
    
    },
    adjustStartTime() {
      this.adjustRanges();
      setStartTime(this.clipStart);
    },
    adjustEndTime() {
      this.adjustRanges();
      setEndTime(this.clipEnd);
    },
    //changing both times at once would cause problems
    //but they only both change when the user changes the start time to be greater than the end time
    //so it works out the same
    adjustRanges() {
      if (parseInt(this.clipStart) > parseInt(this.clipEnd)) {
        this.clipEnd = this.clipStart;
        setEndTime(this.clipEnd);
      } else if (parseInt(this.clipEnd) < parseInt(this.clipStart)) {
        this.clipStart = this.clipEnd;
        setStartTime(this.clipStart);
      }
    },
    backToHome() {
      this.$router.push({ path:"/"})
    },
    playVideo() {
      playPlayer();
    },
    restartVideo() {
      restartPlayer();
    },
    async loadLink(linkId) {
      let link = await api.getLink(linkId);
      this.link = link;
      this.clipEnd = link.duration || 0;

      this.$store.dispatch('savePageTitle', link.title)
    }
  },
  async created() {
    // Set default page title - will be updated when link is loaded
    this.$store.dispatch('savePageTitle', 'Link Page')

    let id = this.$route.params.id;
    
    await this.loadLink(id);
    this.submittingUser = await api.getUser(this.link.userId);
    this.userSavedLink = await api.checkUserSavedLink(this.user.id, this.link.id);

    //load Youtube player
    this.youtubePlayer = await createPlayer(this.link.contentId, null);
    if (this.link.isClip) {
      setLoopTimes(this.link.startTime, this.link.endTime);
      setIsLoop(true);
    } else {
      setIsLoop(this.loopClip);
      setEndTime(this.endTime);
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

.link-title {
  width: 80%;
  align-items: center;
}

.content-preview {
  position: relative;
  border: 1px solid #ccc;
  width: 100%;
  height: 70vh;
  overflow: hidden;
}

.iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.clip-duration {
  width: 100%;
  height: 20px;
  background-color: #ccc;
  border-radius: 4px;
  overflow: hidden;
}
.clip-duration-bar {
  height: 100%;
  background-color: #007bff;
  transition: width 0.5s ease-out;
  border-radius: 4px;
}
.main-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.link-top-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
}

.link-top-buttons button{
  margin: 0 5px;
}

.author-link{
  margin: 0 0px;
}

.clip-controls {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  align-items: center;
  overflow: hidden;
}

.clip-controls-time-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.clip-controls-title {
  margin-left: 10px;
  margin-right: 10px;
}

.clip-controls-text-input {
  width: 30px;
}

.create-clip-button {
  margin: 10px;
}

@media (max-width: 600px) { /* For mobile devices */
  .linkpage {
    width: 100%;
  }
  .content-preview {
    margin: 0;
    width: 100%;
    height: 400px;
  }

  .clip-controls {
    flex-direction: column;
  }
}
</style>


