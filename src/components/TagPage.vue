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
      this.$router.push({ path: `/link/${link.id}`})
    },
    async saveLink(link) {
      await api.saveLink(this.user.id, link.id);
      await this.loadLinks();
    },
    async unsaveLink(link) {
      await api.unsaveLink(this.user.id, link.id);
      await this.loadLinks();
    },
    async loadTag() {
      this.tag = await api.getTag(this.tagId)
    },
    async loadLinks() {
      this.links = await api.getLinksByTagWithUserData(this.user.id, this.tag.id)
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  async created() {
    let id = this.$route.params.id;
    id = parseInt(id);
    this.tagId = id;
    this.user = await api.getUser(1);
    
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


