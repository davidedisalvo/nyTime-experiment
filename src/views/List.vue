<template>
  <div>
        <div class="noFav" v-if="Object.keys($store.state.bookList).length === 0 && Object.keys($store.state.articleList).length === 0">You don't have any favourite books or articles at the moment</div>
    <book-list v-if="Object.keys($store.state.bookList).length > 0" />
    <article-list v-if="Object.keys($store.state.articleList).length > 0"/>

  </div>
</template>

<script>
  import bookList from "../components/BookList.vue";
  import articleList from "../components/ArticleList.vue";

export default {
  components: {bookList, articleList},
  computed: {
    showingBookList() {
      return this.$store.state.bookList.length
    },

  showingList() {
      return this.$store.state.bookList.length
    },

  

  }
}
</script>

<style scoped>
.noFav {
  margin-top: 500px;
}
</style>
