<template>
  <div class="vote-button">
    <button @click="upvote">Upvote</button>
    <div>{{voteCount}}</div>
    <button @click="downvote">Downvote</button>
  </div>
</template>