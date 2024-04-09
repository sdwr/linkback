<template>
  <div class="delete-modal">
    <div class="modal-content">
      <button class="close-button" @click="close()">X</button>
      <div class="modal-header">
        <h2>Delete Link</h2>
      </div>
      <div class="modal-text"> Are you sure you want to delete this link?</div>
      <div class="modal-footer">
        <button @click="close()">Cancel</button>
        <button @click="deleteLink()">Delete</button>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api';

export default {
  name: 'DeleteModal',
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  methods: {
    async deleteLink() {
      let link = await api.deleteLink(this.link.id);
      if (!link) {
        this.close();
        return;
      }
      this.$emit('delete');
      this.$router.push({ path: '/' })
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>
<style scoped>

.delete-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-header {
  padding-bottom: 20px;
  align-content: center;
  text-align: center;
}

.modal-content {
  background-color: #fefefe;
  height: 200px;
  margin: 15% auto;
  padding: 5px;
  border: 1px solid #888;
  width: 40%;
  text-align: center;

}

.modal-text {
  padding: 20px;
  text-align: center;

}
.modal-footer {
  gap: 10px;
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  

}


</style>