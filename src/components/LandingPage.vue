<template>
  <div class="landing-page">
  <div id="g-signin2">Sign in with Google</div>
    <div class="add-link">
      <input v-model="newLink" @keyup.enter="addLink" type="url" placeholder="Paste a URL here..." />
      <button @click="addLink">Add Link</button>
    </div>
    <div class="top-links">
      <h2>Top Links</h2>
      <div v-for="link in topLinks" :key="link.id">
        <a :href="`/link/${link.id}`" @click.prevent="goToLink(link)">{{link.url}}</a>
        <!-- Add a voting component here -->
        <!-- Add a link to the HomePage of this link here -->
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      newLink: '',
      topLinks: []
    }
  },
  methods: {
    async addLink() {
      if(this.newLink && this.newLink.length > 0) {
        await api.mockAddLink(this.newLink)
        await this.getLinks()
        this.newLink = ''
      }
    },
    async getLinks() {
      api.mockGetLinks().then(links => {
        this.topLinks = {...links}
        console.log(this.topLinks)
      })
    },
    goToLink(link) {
      console.log(link)
      this.$router.push({ name: 'linkpage', query: { link: JSON.stringify(link)}})
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
  },
  created() {
    this.getLinks();
  },
  mounted() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({ client_id: '1078294452749-9a01cctu094i3v8p61u0uat7qk8ttu74.apps.googleusercontent.com' });
      window.gapi.signin2.render('g-signin2', {
          scope: 'profile email',
          width: 240,
          height: 50,
          longtitle: true,
          theme: 'dark',
          onsuccess: this.onSignIn,
          onfailure: this.onFailure
      });
    });
  }
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-link {
  margin: 20px;
  display: flex;
  justify-content: center;
}

.top-links {
  width: 80%;
}

.top-links > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
</style>