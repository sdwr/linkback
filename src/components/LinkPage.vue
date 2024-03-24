<template>
  <div class="linkpage">
    <div class="link-top-buttons">
      <button v-if="!userSavedLink" @click="saveToLinks()">Save</button> <!-- Save to links button -->
      <button v-if="userSavedLink" @click="unsaveToLinks()">Unsave</button> <!-- Saved button -->
      <button v-if="userIsOwner" @click="deleteLink()">Delete</button> <!-- Delete button -->
      <span class="author-link">
        Added by: <a 
          :href="`/user`" 
          @click.prevent="goToUser(submittingUser.id)">
            {{submittingUser.username}}
        </a>
      </span>
    </div>
    <div class="content-preview">
      <iframe v-if="link" class="iframe" :src="embedLink"></iframe>
      <div class="not-embeddable-warning" v-else>
        <h2>Link not embeddable</h2>
        <a :href="link.url" target="_blank" rel="noopener noreferrer">Click here to go to link</a>
        <div class="embed-spacer"></div>
        <a :href="archiveLink" target="_blank" rel="noopener noreferrer">Click here to go to archive link</a>
      </div>
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
            <input type="text" v-model="newTagName" @keyup.enter="addTag" placeholder="Enter new tag">
            <button type="submit" @click="addTag">Add Tag</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import VoteButton from '@/components/VoteButton.vue'
import api from '@/api';
import { createArchiveLink } from '@/utils'

export default {
  components: {
    VoteButton
  },
  data() {
    return {
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
      userSavedLink: false, // Flag to check if the user has saved the link
  
    }
  },
  computed: {
    embedLink() {
      if(!this.link) return null;
      return this.link.embeddable ? this.link.url : this.archiveLink;
    },
    archiveLink() {
      if(!this.link) return null;
      return createArchiveLink(this.link);
    },
    userIsOwner() {
      return this.user && this.user.id === this.link.userId;
    }
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
    async addTag() {
      if(this.newTagName && this.newTagName.length > 0) {
        await api.addTag({
          name: this.newTagName,
          linkId: this.link.id
        })
        this.newTagName = ''
        this.tags = await api.getTagsByLink(this.link.id)
      }
    },
    backToHome() {
      this.$router.push({ path:"/"})
    },
    goToOriginal() {
      this.$router.push({ path: `/tube/${this.link.originalLinkId}`})
    
    },
    goToTag(tag) {
      this.$router.push({ path: `/tag/${tag.name}`})
    },
    async loadLink(linkId) {
      
      let link = await api.getLink(linkId)
      this.link = link
      
      this.$store.dispatch('savePageTitle', link.title)
    },
  },
  async created() {
    // Set default page title - will be updated when link is loaded
    this.$store.dispatch('savePageTitle', 'Link Page')

    await this.loadLink(this.$route.params.id)
    this.submittingUser = await api.getUser(this.link.userId);
    this.user = await api.getUser(1);
    this.userSavedLink = await api.checkUserSavedLink(this.user.id, this.link.id);
    this.tags = await api.getTagsByLink(this.link.id);

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
  border: 1px solid #ccc;
  width: 100%;
  height: 800px;
  overflow: auto;
}

.iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.not-embeddable-warning {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: orange;
}

.embed-spacer {
  height: 20px;
}

.main-content {
  display: flex;
  width: 80%;
  justify-content: space-between;
}

.link-top-buttons button{
  margin: 0 5px;
}

.author-link{
  margin: 0 10px;
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
</style>


