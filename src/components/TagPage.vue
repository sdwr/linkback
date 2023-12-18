<template>
  <div class="linkpage">
  <button @click="goBack()"> &lt; Go Back</button>
  <h1 class="tag-title">{{tag.name}}</h1>
    <div class="main-content">
      <div class="links">
        <div v-for="link in links" :key="link.id">
          <LinkItem :link="link" 
            @onClick="goToLink"
            @onSave="saveLink"
            @onUnsave="unsaveLink"
          ></LinkItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api';
import LinkItem from '@/components/LinkItem.vue';

export default {
  components: {
    LinkItem,
  },
  data() {
    return {
      tagId: null,
      tag: {name: ""},
      links: [],
    }
  },
  methods: {
    goToLink(link) {
      if(link.domain === 'youtube.com') {
        this.$router.push({ path: `/tube/${link.linkId}`})
      } else {
        this.$router.push({ path: `/link/${link.linkId}`})
      }
    },
    saveLink() {
      //todo
    },
    unsaveLink() {
      //todo
    },
    async loadTag() {
      this.tag = await api.getTag(this.tagId)
    },
    async loadLinks() {
      this.links = await api.getLinksByTag(this.tag)
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  async created() {
    let id = this.$route.params.id;
    id = parseInt(id);
    this.tagId = id;

    await this.loadTag();
    await this.loadLinks();

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

.main-content {
  display: flex;
  width: 80%;
  justify-content: center;
}

.tag-title {
  
}

</style>


