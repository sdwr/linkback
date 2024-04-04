<template>
  <div class="create-link-page">
    <div class="create-link-container">
      <CreateLinkCard />
    </div>
  </div>
</template>

<script>
import CreateLinkCard from '@/components/CreateLinkCard.vue'

export default {
  name: 'CreateLinkPage',
  components: {
    CreateLinkCard
  },
  computed: {
    storedUser () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    createLink() {
      this.$router.push({ name: 'createlink' });
    },
  },
  created() {
    console.log('CreateLinkPage created')
  }
};
</script>
