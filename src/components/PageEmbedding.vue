<template>
  <div class="page-embedding">
    <iframe v-if="link" class="iframe" :src="embedLink"></iframe>
    <div class="not-embeddable-warning" v-else>
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
  computed: {
    embedLink() {
      if(!this.link) return null;
      return this.link.embeddable ? this.link.url : this.archiveLink;
    },
    archiveLink() {
      if(!this.link) return null;
      return createArchiveLink(this.link);
    },
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
</style>
