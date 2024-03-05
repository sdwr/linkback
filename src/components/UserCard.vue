<template>
  <div class="user-card">
    <img :src="userThumbnail" alt="User thumbnail" />
    <div class="user-info">
      <h3>{{ user.name }}</h3>
      <p>{{ user.id }}</p>
    </div>
  </div>
</template>

<script>
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
      return this.user.thumbnail || this.defaultThumbnail || null;
    },
  },
};
</script>
<style scoped>
.user-card {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.user-info  {
  margin-left: 20px;
}
</style>
```