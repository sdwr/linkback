<template>
  <div class="user-card">
    <img class="user-thumbnail" :src="userThumbnail" alt="User thumbnail" />
    <div class="user-info">
      <div class="user-link"><a :href="`/user/test`" @click.prevent="goToUserPage()">{{user.username}}</a></div>
      <div class="user-link"><a :href="`/user/test`" @click.prevent="goToUserPage()">{{user.id}}</a></div>
    </div>
  </div>
</template>

<script>
import defaultThumbnail from '@/assets/default-user-thumbnail.png';

export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    userThumbnail() {
      return this.user.thumbnail || defaultThumbnail || null;
    },
    goToUserPage() {
      this.$router.push({ name: 'userpage', params: { id: this.user.id } });
    },
  },
};
</script>
<style scoped>
.user-card {
  display: flex;
  height: 100%;
  align-items: center;
}
.user-info  {
  margin-left: 20px;
}
.user-thumbnail {
  height: 100%;
  width: 80px;
  border-radius: 50%;
}
.user-link {
  margin: 10px 0;
}
</style>
```