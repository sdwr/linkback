<template>
  <div class="tag-item">
    <!-- <div class="voting">
      <button @click="upvote">🔼</button>
      <div>{{ tag.votes }}</div>
      <button @click="downvote">🔽</button>
    </div> -->
    
    <div class="tag-item-name">
      <a :href="tag.name" @click.prevent="goToTag(tag)">{{ tag.name }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagItem',
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToTag(tag) {
      this.$router.push({ path: `/tag/${tag.id}`});
    },
    upvote() {
      this.$emit('upvote', this.tag.id);
    },
    downvote() {
      this.$emit('downvote', this.tag.id);
    }
  },
};
</script>

<style scoped>
.tag-item {
  border-radius: 5px;
  background-color: lightblue;
  margin: 0px;
  padding: 2px;
}
.voting {
  padding: 0 10px;
}
.tag-item-name {
  align-self: center;
}
</style>