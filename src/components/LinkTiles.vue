<template>
  <div class="tiles-container">
    <div class="tile" v-for="link in links" :key="link.id">
      <LinkTile :link="link"></LinkTile>
    </div>
  </div>
</template>

<script>
import LinkTile from '@/components/LinkTile.vue';

export default {
  name: 'LinkTiles',
  components: {
    LinkTile,
  },
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
    }
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>
<style scoped>
.tiles-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  align-content: flex-start;
}
.tile {
  width: 200px;
  height: 200px;
  margin: 5px;
}
</style>