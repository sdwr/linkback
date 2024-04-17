<template>
  <div v-if="!hideOverlay" @click="play" class="overlay-container">
    <div class="button-container">
      <button v-if="isReady" class="button">
        <i class="fas fa-play"></i> 
      </button>
      <button v-else class="button">
        <i class="fas fa-spinner fa-spin"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerOverlay',
  props: {
    isReady: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hideOverlay: false,
    }
  },
  emits: ['play'],
  methods: {
    play() {
      if(!this.isReady) return;
      
      this.$emit('play');
      this.hideOverlay = true;
    },
  },
}
</script>
<style scoped>


.overlay-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-container {
    border: none;
    width: 80px;
    height: 50px;
    padding: 10px 20px;
    cursor: pointer;
}
.button {
  width: 100%;
  height: 100%;
}

</style>