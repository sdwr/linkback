<template>
  <div class="linkpage">
  <button @click="backToHome"> &lt; Back</button>
  <h1 v-if="link">{{link.title || link.url}}</h1>
    <div class="content-preview">
      <iframe v-if="link" :src="embedLink" style="width:100%; height:600px; border:none;"></iframe>
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
import { createArchiveLink } from '@/utils'

export default {
  components: {
    VoteButton
  },
  data() {
    return {
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
    }
  },
  methods: {
    async addTag() {
      if(this.newTagName && this.newTagName.length > 0) {
        await api.addTag({
          name: this.newTagName,
          linkId: this.link.linkId
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
    async loadLink(linkId) {
      let link = await api.getLink(linkId)
      console.log(link)
      this.link = link
    },
  },
  async created() {
    await this.loadLink(this.$route.params.id)
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
  height: 500px;
  overflow: auto;
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


