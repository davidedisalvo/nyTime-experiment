<template>
  <div class="booklist">
    <v-layout row class="mt-3">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="orange" dark>
            <h3>My Articles</h3>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list two-line>
            <template v-for="(item, index) in Object.values(showingArticles)">
              <v-divider :key="index" :inset="item.inset"></v-divider>

              <v-list-tile :key="item.title" avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.headline.main"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.byline.original"></v-list-tile-sub-title>

                  <!-- <v-btn><a :href="item.link">Buy it now</a></v-btn> -->
                </v-list-tile-content>
                <v-card-actions>
                  <a :href="item.web_url" target="_blank">
                    <v-btn flat color="orange">Read the article</v-btn>
                  </a>
                                    <v-icon @click="deleteArticle(item)" small>fas fa-times-circle</v-icon>

                </v-card-actions>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {

    methods: {
      deleteArticle(item) {
        const articleList = { ...this.showingArticles };
          delete articleList[item._id];
          this.$store.commit("SET_ARTICLELIST", articleList, );

      }
    },
    computed: {
      showingArticles() {
        return this.$store.state.articleList;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .v-card__actions {
    a {
      text-decoration: none !important;
    }
  }
  .booklist {
    margin-top: 100px;
  }
</style>
