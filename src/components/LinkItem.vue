<template>
  <div class="link-item" style="display: flex; align-items: center; height: 100px; width: 100%;">
    <!-- Voting Section -->
    <div class="voting" style="flex-shrink: 0; padding: 0 10px;">
      <button @click="upvote">🔼</button>
      <div>{{ link.votes }}</div>
      <button @click="downvote">🔽</button>
    </div>

    <!-- Thumbnail -->
    <div class="thumbnail" style="flex-shrink: 0; padding: 0 10px;">
      <img :src="thumbnail" alt="thumbnail" style="height: 80px;">
    </div>

    <!-- Link Details -->
    <a :href=link.url class="details" style="flex-grow: 1;" @click.prevent="clickLink()">
      <div class="title" style="font-size: 1.2em; font-weight: bold;">{{ link.title }}</div>
      <div class="url" style="font-size: 0.8em;">{{ link.url }}</div>
    </a>

    <!-- Duration -->
    <div class="duration" style="flex-shrink: 0; padding: 0 10px;">
      length: {{ duration }}s
    </div>

    <!-- Save Link -->
    <div class="save-link" style="flex-shrink: 0; padding: 0 10px;">
      <button @click="saveLink" v-if="!isSaved">💾</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LinkItem',
  props: {
    link: {
      type: Object,
      required: true,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
  }),
  computed: {
    thumbnail() {
      return this.link.thumbnail || require('@/assets/tiny-default-thumbnail.png')
    },
    duration() {
      return this.link.startTime && this.link.endTime
        ? this.link.endTime - this.link.startTime
        : this.link.duration
    },
  },
  methods: {
    upvote() {
      // Implement upvote functionality
      // For example, emit an event or increment a local vote counter
    },
    downvote() {
      // Implement downvote functionality
    },
    saveLink() {
      this.$emit('on-save', this.link)
    },
    clickLink() {
      this.$emit('on-click', this.link)
    }
  },
};
</script>
<style scoped>
.link-item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  height: 100px;
  width: 100%;
}
.voting {
  flex-shrink: 0;
  padding: 0 10px;
}
.thumbnail {
  flex-shrink: 0;
  padding: 0 10px;
  img {
    height: 80px;
  }
}
.details {
  flex-grow: 1;
  .title {
    font-size: 1.2em;
    font-weight: bold;
  }
  .url {
    font-size: 0.8em;
  }
}
.duration {
  flex-shrink: 0;
  padding: 0 10px;
}
</style>
