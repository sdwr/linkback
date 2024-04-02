<template>
  <div class="landing-page">
    <div class="top-menu">
      <!-- <div class="top-tags-container">
        <h2>Top Tags</h2>
        <div class="top-tags">
          <div v-for="tag in topTags" :key="tag.id">
            <TagItem :tag="tag"></TagItem>
          </div>
        </div>
      </div> -->
    </div>
    <div class="links-container">
      <div class="recent-links">
        <h2>Recent Links</h2>
        <div v-for="link in recentLinks" :key="link.id">
          <LinkItem :link="link" :hasVoting="false"
            @onClick="goToLink"
            @onSave="saveLink"
            @onUnsave="unsaveLink"
            @onVote="loadLinks"
          ></LinkItem>
          <!-- Additional components here -->
        </div>
      </div>
      <div v-if="!isOnMobile" class="top-links">
        <h2>Top Links</h2>
        <div v-for="link in topLinks" :key="link.id">
          <LinkItem :link="link" 
            @onClick="goToLink"
            @onSave="saveLink"
            @onUnsave="unsaveLink"
            @onVote="loadLinks"
          ></LinkItem>
          <!-- Additional components here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import backendApi from '@/api/backendApi'
import loginApi from '@/api/loginApi'
import LinkItem from '@/components/LinkItem.vue'
import CreateLinkButton from '@/components/CreateLinkButton.vue'
import TagItem from '@/components/TagItem.vue'

export default {
  components: {
    LinkItem,
    CreateLinkButton,
    TagItem,
  },
  computed: {
      storedUser () {
        return this.$store.getters.getUser
      },
      user() {
        return this.$store.getters.getUser || {}
      },
      isOnMobile() {
        return this.$store.getters.getIsOnMobile
      }
  },
  data() {
    return {
      newLink: '',
      topTags: [],
      topLinks: [],
      recentLinks: [],
    }
  },
  methods: {
    async addLink() {
      if(this.newLink && this.newLink.length > 0) {
        try {
          await api.addLink({
            title: null,
            url: this.newLink,
            startTime: 0,
            endTime: 0,
            isClip: false,
            loopClip: false,
            originalVideo: null,
            userId: this.user.id,
          })

          this.newLink = '';
          await this.getTopLinks();
          await this.getNewLinks();
        } catch (error) {
          console.error('Error adding link:', error);
        }
      }
    },
    async getTopTags() {
      this.topTags = [];
      try {
        const tags = await api.getTopTags();
        this.topTags = tags;
      } catch (error) {
        console.error('Error fetching top tags:', error);
      }
    },
    async getTopLinks() {
      this.topLinks = [];
      try {
        const tags = await api.getTopLinks();
        this.topLinks = tags;
        this.currentTab = 'top';
        
      } catch (error) {
        console.error('Error fetching top links:', error);
      }
    },
    async getNewLinks() {
      this.recentLinks = [];
      try {
        const links = await api.getNewLinksWithUserData(this.user.id);
        this.recentLinks = links;
        this.currentTab = 'recent';
      } catch (error) {
        console.error('Error fetching new links:', error);
      }
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
    onSignIn(googleUser) {
      console.log(googleUser)
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    },
    onFailure(error) {
      console.log(error)
    },
    checkUser() {
    },
    async loadTags() {
      await this.getTopTags();
    },
    async loadLinks() {
      await this.getTopLinks();
      await this.getNewLinks();
    }
  },
  async created() {
    //set page title
    this.$store.dispatch('savePageTitle', 'All Links');

    await this.loadTags();
    await this.loadLinks();
  },
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-link {
  margin: 20px;
}

.top-menu {
  display:flex;
  flex-direction: row;
  align-items: center;
}

.top-tags-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-tags {
  display: flex;
  flex-wrap: wrap;
}

.add-link {
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  justify-content: center;
}

.links-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  overflow: hidden;
}

.top-links, .recent-links {
  flex: 1;
  min-width: 300px;
}

.top-links > div, .recent-links > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

@media (max-width: 600px) {
    .links-container {
        flex-direction: column;
    }
    .top-links, .recent-links {
        /* Additional styling for mobile layout */
    }
}
</style>