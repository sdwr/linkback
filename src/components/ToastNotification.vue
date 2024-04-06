<template>
  <div class="hidden-toast-component"></div>
</template>
<script>
import {useToast} from 'vue-toast-notification';
import {TOAST_TYPE} from '@/consts'

export default {
  name: 'ToastNotification',
  data() {
    return {
      toast: null,
    }
  },
  computed: {
    toastMessage() {
      return this.$store.getters.getToast
    }
  },
  watch: {
    toastMessage(message) {
      if(message.type === TOAST_TYPE.SUCCESS) {
        this.toast.success(message.text)
      } else if(message.type === TOAST_TYPE.ERROR) {
        this.toast.error(message.text)
      } else if(message.type === TOAST_TYPE.INFO) {
        this.toast.info(message.text)
      } else if(message.type === TOAST_TYPE.WARN) {
        this.toast.warn(message.text)
      }
    }
  },
  created() {
    this.toast = useToast()
  }
}

</script>
<style scoped>
.hidden-toast-component {
  display: none;
}

</style>