<template>
  <div class="linkpage">
  <h1 class="tag-title">{{tag.name}}</h1>
  <div class="header-tabs">
    <div class="header-tab-button" @click="openList"
      :class="{'selected': showList }">
      <div>List</div>
      <i class="fas" :class="{'fa-chevron-up': showList, 'fa-chevron-down': !showList}"></i>

    </div>
    <div class="header-tab-button" @click="openTiles"
      :class="{'selected': showTiles }">
      <div>Tiles</div>
      <i class="fas" :class="{'fa-chevron-up': showTiles, 'fa-chevron-down': !showTiles}"></i>
    </div>
  </div>
    <div class="main-content">
      <div class="links">
        <LinkTiles v-if="showTiles" :links="links"></LinkTiles>
        <div v-if="showList" class="list-wrapper">
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
  </div>
</template>
<script>
import api from '@/api';
import LinkTiles from '@/components/LinkTiles.vue';
import LinkItem from '@/components/LinkItem.vue';

export default {
  components: {
    LinkTiles,
    LinkItem,
  },
  data() {
    return {
      tagId: null,
      tag: {name: ""},
      links: [],

      //show/hide list and tiles
      showList: true,
      showTiles: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    // UI state
    openList() {
      this.showList = true;
      this.showTiles = false;
    },
    openTiles() {
      this.showList = false;
      this.showTiles = true;
    },
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
    
    //if this is the first page loaded, the user might not be loaded yet??
    
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

.links {
  width: 100%;
}

.tag-title {
  
}

.header-tabs {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
}

.header-tab-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border-right: 1px solid #e0e0e0;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
}

.header-tab-button:hover {
  background-color: #ececec;
}

.header-tab-button.selected {
  background-color: #e0e0e0;
}

.header-tab-button i {
  margin-left: 5px;
}

</style>


