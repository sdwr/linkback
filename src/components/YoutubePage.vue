<template>
  <div class="linkpage">
    <button @click="backToHome"> &lt; Back</button>
    <h1>{{currentLink}}</h1>
    <h2>Author: <a :href="authorLink">{{authorName}}</a></h2> <!-- Author credit -->
    <button @click="saveToLinks">Save to My Links</button> <!-- Save to links button -->
    <a :href="originalVideoLink">Original Video</a> <!-- Link to original video -->

    <div class="content-preview">
      <iframe class="iframe" v-if="currentLink" :src="currentLink"></iframe>
    </div>
    <div v-if="!isClip">
      <!-- Range Sliders -->
      <div>
        <input type="range" v-model="clipStart" @input="adjustRanges" min="0" :max="videoLength" step="1">
        <input type="range" v-model="clipEnd" @input="adjustRanges" :min="0" :max="videoLength" step="1">
      </div>
      
      <!-- Text Inputs -->
      <div>
        <input type="text" v-model="clipStart">
        <input type="text" v-model="clipEnd">
      </div>

      <!-- Loop Input-->
      <div>
        <input type="checkbox" v-model="loopClip">
        <label for="loop">Loop</label>
      </div>

      <button @click="createClip">Create Clip</button>
    </div>
    <div class="main-content">
      <div class="comments">
        <h2>Comments</h2>
        <!-- List of comments here -->
        <div v-for="comment in comments" :key="comment.id">
          {{comment.content}}
          <!-- Voting component for each comment -->
        </div>
        <!-- Form to add a new comment -->
      </div>
      <div class="other-links">
        <h2>Related Links</h2>
        <!-- List of other links here -->
        <div v-for="link in otherLinks" :key="link.id">
          <!-- Link preview here -->
          <!-- Voting component for each link -->
        </div>
        <!-- Form to add a new link -->
      </div>
      <div class="tags">
        <h2>Tags</h2>
        <!-- List of tags here -->
        <div v-for="tag in tags" :key="tag.id">
            <a :href="`/tag/${tag.name}`" @click.prevent="goToTag(tag)">{{tag.name}}</a>
            <!-- Voting component for each tag -->
            <VoteButton :tag-id="tag.id"></VoteButton>
        </div>

        <!-- Form to add a new tag -->
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
      user: null,
      link: null,
      currentLink: null,
      newTagName: '',
      comments: [],
      otherLinks: [],
      tags: [],
      authorName: '', // Author's name
      authorLink: '', // URL to author's homepage
      originalVideoLink: '', // URL to the original video
      isClip: false, // Flag to check if it's the original video
      clipStart: 0, // Start time for the clip
      clipEnd: 0, // End time for the clip
      videoLength: 0, // Length of the video
      loopClip: false, // Flag to check if the clip should loop
      creatingClip: false, // Flag to check if the user is creating a clip
      intervalId: null, // Interval ID for checking if the video has loaded
    }
  },
  watch: {
    $route() {
      this.parseLink();
    }
  },
  methods: {
    saveToLinks() {
      // Method to save the current link to user's saved links
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
        originalVideo: this.link.linkId,
        userId: this.user.userId,
      })
      this.creatingClip = false;
      this.$router.push({ name: 'youtubepage', query: { link: JSON.stringify(clip)}})

    },
    adjustRanges() {
      if (parseInt(this.clipStart) > parseInt(this.clipEnd)) {
        this.clipEnd = this.clipStart;
      } else if (parseInt(this.clipEnd) < parseInt(this.clipStart)) {
        this.clipStart = this.clipEnd;
      }
    },
    async addTag() {
      if(this.newTagName && this.newTagName.length > 0) {
        await api.addTag({
          name: this.newTagName,
          linkId: this.link.linkId,
        })
        this.newTagName = ''
        this.tags = await api.getTagsByLink(this.link.linkId)
      }
      console.log(this.tags)
    },
    backToHome() {
      this.$router.push({ path:"/"})
    },
    goToTag(tag) {
      console.log(tag)
      this.$router.push({ path: `/tag/${tag.name}`})
    },
    parseLink() {
      if(this.$route.query.link) {
        this.link = JSON.parse(this.$route.query.link)
        this.currentLink = this.link.url
      } else if(this.$route.params.url) {
        this.currentLink = this.$route.params.url
      }
      if(this.link.duration) {
        this.videoLength = this.link.duration;
      }
    },
  },
  created() {
    this.parseLink();
    this.user = api.getUser(1);
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
  height: 800px;
  overflow: hidden;
}

.iframe {
  width: 100%;
  height: 100%;
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


