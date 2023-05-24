<template>
  <div class="linkpage">
    <div class="content-preview">
      <!-- Content preview here. This might use an iframe, an img tag, or other method to display the content. -->
    </div>
    <div class="main-content">
      <div class="comments">
        <h2>Comments</h2>
        <!-- List of comments here -->
        <div v-for="comment in comments" :key="comment.id">
          {{comment.content}}
          <!-- Voting component for each comment -->
        </div>
        <!-- Form to add a new comment -->
      </div>
      <div class="other-links">
        <h2>Other Links</h2>
        <!-- List of other links here -->
        <div v-for="link in links" :key="link.id">
          <!-- Link preview here -->
          <!-- Voting component for each link -->
        </div>
        <!-- Form to add a new link -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.linkpage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-preview {
  margin: 20px;
  border: 1px solid #ccc;
  width: 80%;
  height: 500px;
  overflow: auto;
}

.main-content {
  display: flex;
  width: 80%;
  justify-content: space-between;
}

.comments, .other-links {
  border: 1px solid #ccc;
  padding: 10px;
  width: 45%;
  height: auto;
  overflow: auto;
}

.vote-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
}
</style>


