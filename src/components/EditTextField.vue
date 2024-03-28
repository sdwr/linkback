<template>
  <div class="edit-text-field" @focusout="finishEditing">
    <input class="edit-field-input" v-model="newValue" :readonly="!isEditing" @keyup.enter="finishEditing" @keyup.esc="cancelEditing">
    <div v-if="canEdit" class="pencil-icon">
      <i class="fas fa-pencil-alt" @click="startEditing"></i>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    canEdit: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      isEditing: false,
      newValue: this.value,
    }
  },
  watch: {
    value() {
      this.newValue = this.value;
    }
  },
  methods: {
    startEditing() {
      this.isEditing = true;
      this.newValue = this.value;
    },
    finishEditing() {
      this.isEditing = false;
      if (this.newValue !== this.value) {
        this.$emit('edit', this.newValue);
      }
    },
    cancelEditing() {
      this.isEditing = false;
      this.newValue = this.value;
    }
  }

}
</script>
<style scoped>
.edit-text-field {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.edit-field-input {
  text-align: center;
  font-size: 25px;
  flex-grow: 0;
  width: auto;
  margin-right: 10px;

}
.pencil-icon {
  cursor: pointer;
}
input[readonly] {
  border: none;
  outline: none;
  background-color: transparent;
  font-weight: bold;
  color: #333;
}
</style>
