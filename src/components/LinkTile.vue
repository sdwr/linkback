<template>
<div class="link-tile" 
  @mouseover="handleMouseover"
  @mouseleave="handleMouseleave">

  <div class="tile-content" v-if="showContent">
    <div v-if="showYoutube" class="iframe" id="iframe"></div>
    <PageEmbedding v-if="showOther" class="content-preview" :link="link"></PageEmbedding>
  </div>

  <div class="tile-overlay" v-if="!showContent">
    <img class="tile-image" :src="thumbnail" alt="thumbnail">
  </div>
  <div class="loading-overlay" v-if="isLoading">
    <div class="spinner"></div>
  </div>
  <!-- Click overlay is at highest z-level.
      Eats the clicks and passes scrolls through to pageEmbedding -->
  <div class="click-overlay" @click.prevent="goToLink"></div>
</div>
</template>
<script>
import defaultThumbnail from '@/assets/tiny-default-thumbnail.png';
import PageEmbedding from '@/components/PageEmbedding.vue';
import backendApi from '@/api/backendApi';

import { createPlayer, playPlayer, destroyPlayer, restartPlayer, setStartTime, setEndTime, setLoopTimes, setIsLoop } from '@/youtubeplayerapi';

export default {
  name: 'LinkTile',
  components: {
    PageEmbedding,
  },
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
      isLoading: false,

      showYoutube: false,
      showOther: false,
      
      youtubePlayer: null,
      thumb: null,
    }
  },
  computed: {
    showContent() {
      return this.showYoutube || this.showOther;
    },
    linkIsYoutube() {
      return this.link && this.link.domain === 'youtube.com';
    },
    thumbnail() {
      return this.thumb || defaultThumbnail;
    },
  },
  methods: {
    handleMouseover() {
      this.isHovered = true;
      this.isLoading = true;

      //only load content after user has hovered for a second
      setTimeout(() => {
        this.loadContent();
      }, 300);
    },
    handleMouseleave() {

      if(this.youtubePlayer) {
        destroyPlayer();
      }

      //stop showing content after mouse leaves
      this.isHovered = false;
      this.isLoading = false;
      this.showYoutube = false;
      this.showOther = false;
    },
    loadContent() {
      this.isLoading = false;

      if (!this.isHovered) return;
      if (this.showContent) return;

      if (this.linkIsYoutube) {
        this.loadYoutube();
      } else {
        this.loadOther();
      }
    },
    async loadYoutube() {
      this.showYoutube = true;

      await this.$nextTick();

      this.youtubePlayer = await createPlayer(this.link.contentId, {controls: 0});
      if (this.link.isClip) {
        setLoopTimes(this.link.startTime, this.link.endTime);
        setIsLoop(true);
      } else {
        setIsLoop(this.loopClip);
        setEndTime(this.endTime);
      }
      playPlayer();
    },
    loadOther() {
      this.showOther = true;
    },
    goToLink() {
      this.$router.push({ path: `/link/${this.link.id}`});
    },
  },
  async created() {
    this.thumb = await backendApi.fetchImage(this.link.id);
  },
}
</script>
<style scoped>

.link-tile {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
}
.tile-content {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #ddd;
  overflow: hidden;
}

.iframe {
  position: relative;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.content-preview {
  position: relative;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tile-overlay {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.loading-overlay {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.spinner {
  border: 12px solid rgba(255, 255, 255, 0.3); /* Semi-transparent white border */
  border-top: 12px solid #fff; /* Solid white for the spinner top */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Keep the spinner centered */
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.click-overlay {
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  pointer-events: auto;
}
</style>