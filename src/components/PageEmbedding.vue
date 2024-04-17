<template>
  <div class="page-embedding">
    <iframe v-if="embedLink" class="iframe" :src="embedLink"></iframe>
    <div class="not-embeddable-warning" v-else>
      <img class="thumbnail-img" :src="thumbnail" alt="thumbnail">
      <h2>Link not embeddable</h2>
      <a :href="link?.url" target="_blank" rel="noopener noreferrer">Click here to go to link</a>
      <div class="embed-spacer"></div>
      <a :href="archiveLink" target="_blank" rel="noopener noreferrer">Click here to go to archive link</a>
    </div>
  </div>
</template>
<script>
import api from '@/api';
import { createArchiveLink } from '@/utils'
import backendApi from '@/api/backendApi';
import defaultThumbnail from '@/assets/tiny-default-thumbnail.png';

export default {
  props: {
    link: {
      type: Object,
      required: true,
      default: {
        url: null,
        embeddable: false,
      }
    },
  },
  data() {
    return {
      thumb: null,
    }
  },
  computed: {
    // choose what to display based on:
    // - if the link is embeddable
    //      show embed, if not show the page thumbnail
    // - if the link is not a valid URL
    //      show nothing
    // - if the link is to an internal page
    //      show the page thumbnail
    embedLink() {
      if(!this.link) return null;
      
      let validUrl = this.link && this.link.url && this.link.url.startsWith('http');
      if(!validUrl) return null;

      const PROD_URL = 'sdwr.ca';
      let internalPage = this.link.url.includes('localhost') || this.link.url.includes(PROD_URL);
      if(internalPage) return null;

      return this.link.embeddable ? this.link.url : null
    },
    thumbnail() {
      return this.thumb || defaultThumbnail;
    },
    archiveLink() {
      if(!this.link) return null;
      return createArchiveLink(this.link);
    },
  },
  async created() {
    this.thumb = await backendApi.fetchImage(this.link.id);
  },
}
</script>
<style scoped>
.page-embedding {
}
.iframe {
  width: 100%;
  height: 100%;
}
.thumbnail-img {
  height: 80px;
  width: 80px;
  overflow:hidden;
}
</style>
