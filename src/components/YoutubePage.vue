<template>
  <div class="linkpage">
    <div class="link-top-buttons">
      <button v-if="!userSavedLink" @click="saveToLinks()">Save</button> <!-- Save to links button -->
      <button v-if="userSavedLink" @click="unsaveToLinks()">Unsave</button> <!-- Saved button -->
      <button @click="restartVideo()">Restart</button>
      <button v-if="userIsOwner" @click="deleteLink()">Delete</button> <!-- Delete button -->
      <span class="author-link">
        Added by: <a 
          :href="`/user`" 
          @click.prevent="goToUser(submittingUser.id)">
            {{submittingUser.username}}
        </a>
      </span>
      <a v-if="linkIsClip" :href="`/originalVideo`" @click.prevent="goToOriginal()">Original Video</a> <!-- Link to original video -->
    </div>

    <div class="content-preview">
      <div class="iframe" id="iframe" v-if="link"></div>
      <PlayerOverlay 
        :isReady="youtubePlayer !== null"
        @play="playVideo()"
      >
      </PlayerOverlay>
    </div>

    <div v-if="!linkIsClip" class="clip-controls">
      <!-- Clip Controls -->
      <div class="clip-controls-title">
        <h2>Create Clip: </h2>
      </div>

      <!-- Range Sliders -->
      <div class="clip-controls-time-controls">
        <input type="range" v-model="clipStart" @input="adjustRanges" min="0" :max="link.duration" step="1">
        <input class="clip-controls-text-input" type="text" disabled="true" v-model="clipStart">
      
        <input type="range" v-model="clipEnd" @input="adjustRanges" :min="0" :max="link.duration" step="1">
        <input class="clip-controls-text-input" type="text" disabled="true" v-model="clipEnd">
      </div>
      
      <!-- Loop Input-->
      <div>
        <input type="checkbox" v-model="loopClip">
        <label for="loop">Loop</label>
      </div>

      <button class="create-clip-button" @click="createClip">Create Clip</button>
    </div>
    <div class="main-content">
      <div class="comments">
        <div class="bottom-container-header">
          <div>Comments</div>
        </div>
        <!-- List of comments here -->
        <div v-for="comment in comments" :key="comment.id">
          {{comment.content}}
          <!-- Voting component for each comment -->
        </div>
        <!-- Form to add a new comment -->
      </div>
      <div class="other-links">
        <div class="bottom-container-header">
          <div>Related Links</div>
        </div>
        <!-- List of other links here -->
        <div v-for="link in otherLinks" :key="link.id">
          <!-- Link preview here -->
          <!-- Voting component for each link -->
        </div>
        <!-- Form to add a new link -->
      </div>
      <div class="tags">
        <div class="bottom-container-header">
          <div>Tags</div>
        </div>
        <!-- List of tags here -->
        <div class="tags-container">
          <div
            v-for="tag in tags" :key="tag.id">
            <TagItem :tag="tag"></TagItem>
          </div>
        </div>
        
        <!-- Form to add a new tag -->
        <AddTagForm
          :user="user"
          :link="link"
          :existingTags="tags"
          @addTag="onAddTag"
        />
      </div>
    </div>
  </div>
  
</template>
<script>
import Fuse from 'fuse.js'
import VoteButton from '@/components/VoteButton.vue'
import PlayerOverlay from '@/components/PlayerOverlay.vue'
import TagItem from '@/components/TagItem.vue'
import AddTagForm from '@/components/AddTagForm.vue'
import api from '@/api';
import { loadYoutubeUrl } from '@/utils'
import { createPlayer, playPlayer, restartPlayer, setLoopTimes, setIsLoop } from '@/youtubeplayerapi';

export default {
  components: {
    VoteButton,
    PlayerOverlay,
    TagItem,
    AddTagForm,
  },
  data() {
    return {
      youtubePlayer: null,
      user: null,
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
      comments: [],
      otherLinks: [],
      tags: [],
      submittingUser: {
        username: '',
        userId: null,
      },
      isClip: false, // Flag to check if it's the original video
      clipStart: 0, // Start time for the clip
      clipEnd: 0, // End time for the clip
      loopClip: false, // Flag to check if the clip should loop
      creatingClip: false, // Flag to check if the user is creating a clip,
      userSavedLink: false, // Flag to check if the user has saved the link
    }
  },
  computed: {
    linkIsClip() {
      return this.link && this.link.isClip;
    },
    userIsOwner() {
      return this.user && this.user.id === this.link.userId;
    },
  },
  watch: {
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
      let result = await api.deleteLink(this.link.id);
      if(result) {
        this.$router.push({ path: "/"})
      }
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
      this.creatingClip = false;
      this.goToLink(clip);

    },
    goToLink(link) {
      if(link.domain === 'youtube.com') {
        this.$router.push({ path: `/tube/${link.id}`})
      } else {
        this.$router.push({ path: `/link/${link.id}`})
      }
    },
    goToUser(id) {
      this.$router.push({ path: `/user/${id}`})
    },
    goToOriginal() {
      this.$router.push({ path: `/tube/${this.link.originalLinkId}`})
    
    },
    adjustRanges() {
      if (parseInt(this.clipStart) > parseInt(this.clipEnd)) {
        this.clipEnd = this.clipStart;
      } else if (parseInt(this.clipEnd) < parseInt(this.clipStart)) {
        this.clipStart = this.clipEnd;
      }

      // update the iframe based on the new clip times
      // should do in youtube API instead
      // this.link.startTime = this.clipStart;
      // this.link.endTime = this.clipEnd;
      // this.link = loadYoutubeUrl(this.link);\
      setLoopTimes(this.clipStart, this.clipEnd);

    },
    async onAddTag(tag) {
        this.tags = await api.getTagsByLink(this.link.id)
    },
    backToHome() {
      this.$router.push({ path:"/"})
    },
    goToTag(tag) {
      this.$router.push({ path: `/tag/${tag.id}`})
    },
    playVideo() {
      playPlayer();
    },
    restartVideo() {
      restartPlayer();
    },
    async loadLink(linkId) {
      let link = await api.getLink(linkId);
      link = loadYoutubeUrl(link);
      this.link = link;

      this.$store.dispatch('savePageTitle', link.title)
    }
  },
  async created() {
    // Set default page title - will be updated when link is loaded
    this.$store.dispatch('savePageTitle', 'Link Page')

    let id = this.$route.params.id;
    
    await this.loadLink(id);
    this.submittingUser = await api.getUser(this.link.userId);
    this.user = await api.getUser(1);
    this.userSavedLink = await api.checkUserSavedLink(this.user.id, this.link.id);
    this.tags = await api.getTagsByLink(this.link.id);

    //load Youtube player
    this.youtubePlayer = await createPlayer(this.link.contentId, null);
    if (this.link.isClip) {
      setLoopTimes(this.link.startTime, this.link.endTime);
      setIsLoop(true);
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
  position: relative;
  border: 1px solid #ccc;
  width: 100%;
  height: 60vh;
  overflow: hidden;
}

.iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.link-top-buttons button{
  margin: 0 5px;
}

.author-link{
  margin: 0 10px;
}

.clip-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.clip-controls-time-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.clip-controls-title {
  margin: 0px 20px;
}

.clip-controls-text-input {
  width: 30px;
}

.create-clip-button {
  margin: 10px;
}

.comments, .other-links, .tags {
  border: 1px solid #ccc;
  width: 33%;
  height: 20vh;
  overflow: hidden;
}


.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
}

.bottom-container-header {
  height: 30px;
  font-size: 1.5em;
  font-weight: bold;
  padding-bottom: 10px;
}

.vote-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
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
}
</style>


