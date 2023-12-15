<template>
  <div class="landing-page">
    <div> <GoogleSignIn /> </div>
    <div class="user-link"><a :href="`/user/test`" @click.prevent="goToUser(user)">{{user.username}}</a></div>
    <div class="add-link">
      <input v-model="newLink" @keyup.enter="addLink" type="url" placeholder="Paste a URL here..." />
      <button @click="addLink">Add Link</button>
    </div>
    <div class="links-container">
      <div class="top-links">
        <h2>Top Links</h2>
        <div v-for="link in topLinks" :key="link.id">
          <LinkItem :link="link" @onClick="goToLink(link)"></LinkItem>
          <!-- Additional components here -->
        </div>
      </div>
      <div class="recent-links">
        <h2>Recent Links</h2>
        <div v-for="link in recentLinks" :key="link.id">
          <LinkItem :link="link" 
            @onClick="goToLink(link)"
            @onSave="saveLink(link)"
            @onUnsave="unsaveLink(link)"
          ></LinkItem>
          <!-- Additional components here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import GoogleSignIn from '@/components/GoogleSignin.vue'
import LinkItem from '@/components/LinkItem.vue'

export default {
  components: {
    GoogleSignIn,
    LinkItem,
  },
  data() {
    return {
      newLink: '',
      topLinks: [],
      recentLinks: [],
      user: null,
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
            userId: this.user.userId,
          })

          this.newLink = '';
          await this.getTopLinks();
          await this.getNewLinks();
        } catch (error) {
          console.error('Error adding link:', error);
        }
      }
    },
    async getTopLinks() {
      try {
        const links = await api.getLinksForUser(1);
        this.topLinks = links;
        this.currentTab = 'top';
      } catch (error) {
        console.error('Error fetching top links:', error);
      }
    },
    async getNewLinks() {
      try {
        const links = await api.getNewLinks();
        this.recentLinks = links;
        this.currentTab = 'recent';
      } catch (error) {
        console.error('Error fetching new links:', error);
      }
    },
    goToLink(link) {
      console.log(link)
      if(link.domain === 'youtube.com') {
        this.$router.push({ path: `/tube/${link.linkId}`})
      } else {
        this.$router.push({ path: `/link/${link.linkId}`})
      }
    },
    async saveLink(link) {
      console.log("saving link", link, this.user.userId)
      await api.saveLink(this.user.userId, link.linkId);
      await this.getTopLinks();
    },
    async unsaveLink(link) {
      console.log("unsaving link", link, this.user.userId)
      await api.unsaveLink(this.user.userId, link.linkId);
      await this.getTopLinks();
    },
    goToUser(user) {
      this.$router.push({ name: 'userpage', params: { id: user.userId } });
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
      if(!this.user) {
        this.user = api.mockUser;
      }
    }
  },
  async created() {
    this.checkUser();
    await this.getTopLinks();
    await this.getNewLinks();
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

.add-link {
  margin: 20px;
  display: flex;
  justify-content: center;
}

.links-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.top-links, .recent-links {
  width: 45%;
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