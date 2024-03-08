<template>
  <div class="link-item" style="display: flex; align-items: center; height: 100px; width: 100%;">
    <!-- Voting Section -->
    <div class="voting">
      <button @click="upvote">🔼</button>
      <div>{{ link.votes }}</div>
      <button @click="downvote">🔽</button>
    </div>

    <!-- Thumbnail -->
    <div class="thumbnail">
      <img class="thumbnail-img" :src="thumbnail" alt="thumbnail" style="height: 80px;">
    </div>

    <!-- Link Details -->
    <a :href=link.url class="details" @click.prevent="clickLink()">
      <div class="detail-title" style="font-size: 1.2em; font-weight: bold;">{{ link.title || "No title" }}</div>
      <div class="details-url" style="font-size: 0.8em;">{{ link.url }}</div>
    </a>

    <!-- Duration -->
    <div v-if="duration" class="duration" style="flex-shrink: 0; padding: 0 10px;">
      length: {{ duration }}s
    </div>

    <!-- Save Link -->
    <div class="save-link" style="flex-shrink: 0; padding: 0 10px;">
      <button type="button" @click="saveLink()" v-if="!link.saved">💾</button>
      <button type="button" @click="unsaveLink()" v-else>❌</button>
    </div>
  </div>
</template>
<script>
import defaultThumbnail from '@/assets/tiny-default-thumbnail.png';
import backendApi from '@/api/backendApi';
import api from '@/api.js';

export default {
  name: 'LinkItem',
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
  emits: 
    ['save', 'unsave', 'on-click'],
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
  },
  methods: {
    async upvote() {
      let voteDto = {
        linkId: this.link.id,
        userId: this.user.id,
        voteValue: 1,
      };
      await api.addVote(voteDto);
    },
    async downvote() {
      let voteDto = {
        linkId: this.link.id,
        userId: this.user.id,
        vote: -1,
      };
      await api.addVote(this.link.id);
    },
    saveLink() {
      this.$emit('on-save', this.link)
    },
    unsaveLink() {
      this.$emit('on-unsave', this.link)
    },
    clickLink() {
      this.$emit('on-click', this.link)
    }
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
  padding: 0 10px;
}
.thumbnail-img {
  height: 80px;
  width: 80px;
  overflow:hidden;
}
.details {
  flex: 1;
  min-width: 0;
  padding: 0px 30px;
}
.details-title {
  font-size: 1.2em;
  font-weight: bold;
}
.details-url {
  font-size: 0.8em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.duration {
  flex-shrink: 0;
  padding: 0 10px;
}
</style>
