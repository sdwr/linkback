<template>
<div class="bottom-bar-container">
  <div v-if="showBottomContent" class="bottom-bar-content">
      <div v-if="showComments" class="comments">
        <div class="bottom-container-header">
          <div>Comments</div>
        </div>
        <!-- List of comments here -->
        <div v-for="comment in comments" :key="comment.id">
          {{comment.content}}
          <!-- Voting component for each comment -->
        </div>
        <!-- Form to add a new comment -->
      </div>
      <div v-if="showRelatedLinks" class="other-links">
        <div class="bottom-container-header">
          <div>Related Links</div>
        </div>
        <!-- List of other links here -->
        <div v-for="link in otherLinks" :key="link.id">
          <!-- Link preview here -->
          <!-- Voting component for each link -->
        </div>
        <!-- Form to add a new link -->
      </div>
      <div v-if="showTags" class="tags">
        <div class="bottom-container-header">
          <div>Tags</div>
        </div>
        <!-- List of tags here -->
        <div class="tags-container">
          <div
            v-for="tag in tags" :key="tag.id">
            <TagItem :tag="tag"></TagItem>
          </div>
        </div>
        
        <!-- Form to add a new tag -->
        <AddTagForm
          class="add-tag-form"
          :user="user"
          :link="link"
          :existingTags="tags"
          @addTag="onAddTag"
        />
      </div>
  </div>
  <div class="bottom-bar">
    <div class="bottom-bar-button" @click="toggleComments"
      :class="{'selected': showComments }">
      <div>Comments</div>
      <i class="fas" :class="{'fa-chevron-up': showComments, 'fa-chevron-down': !showComments}"></i>

    </div>
    <div class="bottom-bar-button" @click="toggleRelatedLinks"
      :class="{'selected': showRelatedLinks }">
      <div>Related Links</div>
      <i class="fas" :class="{'fa-chevron-up': showRelatedLinks, 'fa-chevron-down': !showRelatedLinks}"></i>

    </div>
    <div class="bottom-bar-button" @click="toggleTags"
      :class="{'selected': showTags }">
      <div>Tags</div>
      <i class="fas" :class="{'fa-chevron-up': showTags, 'fa-chevron-down': !showTags}"></i>
    </div>


  </div>
</div>
</template>
<script>
import api from '@/api';

import TagItem from '@/components/TagItem.vue'
import AddTagForm from '@/components/AddTagForm.vue'

export default {
  name: 'BottomBar',
  components: {
    TagItem,
    AddTagForm,
  },
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // UI state
      showComments: false,
      showRelatedLinks: false,
      showTags: false,
      // Data
      comments: [],
      otherLinks: [],
      tags: [],
    }
  },
  watch : {
    link: {
      handler: async function() {
        this.tags = await api.getTagsByLink(this.link.id)
      },
      deep: true,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    showBottomContent() {
      return this.showComments || this.showRelatedLinks || this.showTags;
    }
  },
  methods: {
    // UI methods
    toggleComments() {
      let newValue = !this.showComments;
      this.closeAll();
      this.showComments = newValue;
    },
    toggleRelatedLinks() {
      let newValue = !this.showRelatedLinks;
      this.closeAll();
      this.showRelatedLinks = newValue;
    },
    toggleTags() {
      let newValue = !this.showTags;
      this.closeAll();
      this.showTags = newValue;
    },
    closeAll() {
      this.showComments = false;
      this.showRelatedLinks = false;
      this.showTags = false;
    },
    // Data methods
    async onAddTag(tag) {
        this.tags = await api.getTagsByLink(this.link.id)
    },

    // Router methods
    goToTag(tag) {
      this.$router.push({ path: `/tag/${tag.id}`})
    },
  },
}

</script>
<style scoped>

/* For the bottom bar itself */
.bottom-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
  position: fixed;
  bottom: 50px;
  left: 0;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
}

.bottom-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #f8f8f8;
  border-top: 1px solid #e0e0e0;
  position: fixed;
  bottom: 0;
  left: 0;
}
.bottom-bar-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  border-right: 1px solid #e0e0e0;
}

.bottom-bar-button:hover {
  background-color: #ececec;
}

.bottom-bar-button.selected {
  background-color: #e0e0e0;
}

.bottom-bar-button i {
  margin-left: 5px;
}

/* For the content of the bottom bar */
.comments, .other-links, .tags {
  border: 3px solid #ccc;
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  overflow: hidden;
}


.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
}

.add-tag-form {
  margin-top: 20px;
}

.bottom-container-header {
  height: 30px;
  font-size: 1.5em;
  font-weight: bold;
  padding: 10px 0;
}

.vote-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
}

@media (max-width: 600px) { /* For mobile devices */
}

</style>