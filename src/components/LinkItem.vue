<template>
  <div class="link-item"
    @click="clickLink()">
    <!-- Voting Section -->
    <div v-if="hasVoting" class="voting">
      <button @click.stop="upvote">🔼</button>
      <div>{{ link.votes }}</div>
      <button @click.stop="downvote">🔽</button>
    </div>

    <!-- Thumbnail -->
    <div class="thumbnail">
      <img class="thumbnail-img" :src="thumbnail" alt="thumbnail" style="height: 80px;">
    </div>

    <!-- Link Details -->
    <div class="details">
      <div class="details-title">{{ link.title || "No title" }}</div>
      <a :href="link.url" @click.stop class="details-url">{{ trimmedUrl }}</a>
      <div class="additional-info">
        <div class="time-ago">{{ timeAgo }}</div>
        <div class="uploaded-by"  @click.stop="goToUser(submittedUser)"> by {{submittedUser.username}}</div>
        <div v-if="duration" class="duration"> length: {{ duration }}s</div>
        <div v-if="link.isClip">✂️</div>
      </div>
      <div class="tags-container">
        <div v-for="tag in link.tags">
          <TagItem :tag="tag"></TagItem>
        </div>
      </div>
    </div>

    <!-- Duration -->
    <!-- <div v-if="duration" class="duration" style="flex-shrink: 0; padding: 0 10px;">
      length: {{ duration }}s
    </div> -->

    <!-- Save Link -->
    <!-- <div class="save-link" style="flex-shrink: 0; padding: 0 10px;">
      Save / Unsave:
      <button type="button" @click.stop="saveLink()" v-if="!link.saved">💾</button>
      <button type="button" @click.stop="unsaveLink()" v-else>❌</button>
    </div> -->
  </div>
</template>
<script>
import defaultThumbnail from '@/assets/tiny-default-thumbnail.png';
import backendApi from '@/api/backendApi';
import api from '@/api.js';
import { trimUrlForDisplay, convertDateToTimeAgo } from '@/utils';
import TagItem from './TagItem.vue';

export default {
  name: 'LinkItem',
  components: {
    TagItem,
  },
  props: {
    link: {
      type: Object,
      required: true,
    },
    hasVoting: {
      type: Boolean,
      default: true,
    },
  },
  emits: 
    ['save', 'unsave', 'on-click', 'on-vote'],
  data: () => ({
    OGthumbnail: null,
  }),
  computed: {
    user() {
      return this.$store.getters.getUser || {};
    },
    thum_thumbnail() {
      let thum = "//image.thum.io/get/width/80/" + this.link.url;
      return thum;
    },
    thumbnail() {
      return this.OGthumbnail || defaultThumbnail;
    },
    duration() {
      return this.link.startTime && this.link.endTime
        ? this.link.endTime - this.link.startTime
        : this.link.duration
    },
    trimmedUrl() {
      if(!this.link) return '';
      return trimUrlForDisplay(this.link.url);
    },
    timeAgo() {
      if(!this.link) return '';
      return convertDateToTimeAgo(this.link.createdAt);
    },
    submittedUser() {
      return this.link.user || {};
    },
  },
  methods: {
    async upvote() {
      let voteDto = {
        linkId: this.link.id,
        userId: this.user.id,
        voteValue: 1,
      };
      await api.addVote(voteDto);
      this.$emit('on-vote');
    },
    async downvote() {
      let voteDto = {
        linkId: this.link.id,
        userId: this.user.id,
        voteValue: -1,
      };
      await api.addVote(voteDto);
      this.$emit('on-vote');
    },
    saveLink() {
      this.$emit('on-save', this.link)
    },
    unsaveLink() {
      this.$emit('on-unsave', this.link)
    },
    clickLink() {
      this.$emit('on-click', this.link)
    },
    goToUser(user) {
      this.$router.push({ path: `/user/${user.id}` });
    },
    goToTag(tag) {
      console.log('goToTag', tag)
      // this.$router.push({ path: `/tag/${tag.id}` });
    },
  },
  async created() {
    // Fetch the thumbnail for the link
    // For example, using a service or API
    this.OGthumbnail = await backendApi.fetchImage(this.link.url);
  },
};
</script>
<style scoped>
.link-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid #ccc;
  height: 100px;
  width: 100%;
}
.voting {
  padding: 0 10px;
}
.thumbnail {
  padding: 0 5px;
}
.thumbnail-img {
  height: 80px;
  width: 80px;
  overflow:hidden;
}
.details {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 10px;
  text-align: left;
}
.details-title {
  font-size: 1.3em;
}
.details-url {
  display: block;
  font-size: 0.8em;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  text-decoration: none;
  color: #007bff; /* A shade of blue commonly used for links */
  transition: text-decoration 0.3s ease;
}

.details-url:hover {
  text-decoration: underline;
  
}

.additional-info {
  margin-top: 5px;
  font-size: 0.8em;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.uploaded-by {
  color: #007bff; /* A shade of blue commonly used for links */

}

.uploaded-by:hover {
  text-decoration: underline;
}

.tags-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
  margin-top: 5px;
  overflow: hidden;
  white-space: nowrap;

}

.save-link {
  display: flex;
  font-size: 0.6em;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.save-link button {
  width: auto;
}
</style>
