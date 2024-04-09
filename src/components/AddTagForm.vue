<template>
  <!-- Form to add a new tag -->
  <form class="add-tag-form" @submit.prevent="addTag" @focusout="handleFormDeselection">
    <div class="add-tag-left-wrapper">
      <input class="add-tag-input" type="text" placeholder="Enter new tag"
        v-model="newTagName">
      <div class="add-tag-suggestions-container" v-if="filteredTags.length > 0 && newTagName.length > 0">
        <div v-for="(tag, index) in filteredTags" :key="index"
          class="add-tag-suggestion"
          @click="selectTag(tag.item.name)"
        >{{ tag.item.name }}</div>
      </div>
    </div>
    <button class="add-tag-button" type="submit">Add Tag</button>
  </form>
</template>


<script>
import Fuse from 'fuse.js';
import api from '@/api';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    link: {
      type: Object,
      required: true,
    },
    existingTags: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newTagName: '',
      fuseSearch: null,
      filteredTags: [],
    }
  },
  computed: {
    allTags() {
      return this.$store.getters.getAllTags;
    },
  },
  watch: {
    //TODO - hide existing tags from autocomplete
    allTags: function() {
      this.fuseSearch = new Fuse(this.allTags, {
        keys: ['name'],
        includeScore: true,
        threshold: 0.3,
      });
    },
    newTagName: function() {
      if(this.fuseSearch && this.newTagName.length > 0) {
        this.filteredTags = this.fuseSearch.search(this.newTagName);
      }
    }
  },
  methods: {
    //delay clearing the input so the click has time to register
    //clearing the input clears the suggestions, so we need to wait
    handleFormDeselection(event) {
      setTimeout(() => {
        this.newTagName = '';
      }, 100);
    },
    async selectTag(tag) {
      this.newTagName = tag;
      await this.addTag();

    },
    async addTag() {
      if(this.newTagName && this.newTagName.length > 0) {
        await api.addTagToLink(this.user.id, this.link.id, this.newTagName);
        
        this.$store.dispatch('loadAllTags');
        this.$emit('addTag');
        
      }
      this.newTagName = '';
    },
  },
  async created() {
    // Load all tags for the autocomplete
    this.$store.dispatch('loadAllTags')

  },
}
</script>
<style scoped>
.add-tag-form {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.add-tag-left-wrapper {
  display: flex;
  flex-direction: column;
}

.add-tag-suggestions-container {
  border: 1px solid #ccc;
}

.add-tag-suggestion {
  padding: 2px 0;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.add-tag-suggestion:hover {
  background-color: #ccc;
}


.add-tag-input {
  max-height: 20px;
}

.add-tag-button {
  max-height: 20px;
}
</style>