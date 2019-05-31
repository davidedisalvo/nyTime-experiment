<template>
  <div class="article">
    <v-responsive color="#222222" dark height="600px" class="jumbotron">
      <v-container fill-height>
        <v-layout align-center class="container">
          <v-flex v-if="!showSearch" text-xs-center class="jumbotron-container">
            <h3 v-if="!showSearch" class="display-3">NYT Articles</h3>
            <v-btn v-if="!showSearch" @click="showSearch = true" color="orange darken-2" dark>
              Search your article
              <v-icon small class="ml-3">fas fa-arrow-right</v-icon>
            </v-btn>
          </v-flex>

          <transition name="slide-left">
            <v-flex text-xs-center v-if="showSearch" class="Search">
              <v-form>
                <v-container>
                  <v-layout row wrap justify-center>
                    <v-flex xs12 sm6 md12>
                      <v-text-field v-model="query" label="Type your subject" outline></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
              <v-container fluid grid-list-xl>
                <h3>Filter by category</h3>
                <v-layout row wrap justify-center align-center>
                  <v-flex xs12 sm6 md12 d-flex>
                    <v-select
                      transition="scale-transition"
                      v-model="selection"
                      :items="items"
                      label="Outline style"
                      outline
                      attach
                    />
                  </v-flex>
                </v-layout>
              </v-container>
              <v-btn
                @click="gettingArticles()"
                color="orange darken-2"
                v-if="showButton"
              >Find articles</v-btn>
            </v-flex>
          </transition>
        </v-layout>
      </v-container>
    </v-responsive>

    <v-layout row wrap class="container-grid">
      <v-flex
        xs12
        sm6
        lg4
        v-for="(item, index) in showArticles"
        :key="`${item.pub_date}${index}`"
        class="grid-item"
      >
        <v-card height="100%">
          <v-card-title primary-title>
            <div class="card-body-container">
              <h3 class="headline mb-4">{{item.headline.main}}</h3>
              <div class="body-content">
                <h4 class="mb-4">{{item.abstract}}</h4>
                <p class="mb-4">{{item.lead_paragraph}}</p>
              </div>
            </div>
          </v-card-title>
          <div class="extra-info">
            <p class="filter">{{ item.pub_date | moment }}</p>
            <p>{{item.byline.original}}</p>
          </div>
          <v-card-actions>
            <a :href="item.web_url" target="_blank">
              <v-btn flat color="orange">Read the article</v-btn>
            </a>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import moment from "moment";
  export default {
    data() {
      return {
        items: [
          "Arts",
          "Fashion",
          "Food",
          "Politics",
          "Science",
          "Sports",
          "Weather",
          "World"
        ],
        query: "",
        selection: "",
        showSearch: false
      };
    },
    methods: {
      gettingArticles() {
        let filter = {
          query: this.query,
          selections: this.selection
        };
        this.$store.dispatch("getting_articles", filter);
      }
    },

    computed: {
      showArticles() {
        return this.$store.state.articles;
      },

      showButton() {
        if (this.selection !== "" && this.query !== "") {
          return true;
        }
      }
    },

    updated() {
      const findClass = document.getElementsByClassName("card-body-container");
      let tallest = 0;
      // Loop over matching divs
      for (let i = 0; i < findClass.length; i++) {
        const element = findClass[i];
        const elementHeight = element.offsetHeight;
        tallest =
          elementHeight > tallest
            ? elementHeight
            : tallest; /* look up ternary operator if you dont know what this is */
      }
      for (i = 0; i < findClass.length; i++) {
        findClass[i].style.height = tallest + "px";
      }
    },

    filters: {
      moment: function(date) {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .v-menu__content {
    top: 0 !important;
    left: 16px;
  }
  .v-card.v-sheet.theme--light {
    margin: 20px;
    padding: 20px;
    background-color: lightgray;
    border-top: 7px solid gray;
  }

  .grid-item {
    margin-bottom: 20px;
  }
  a {
    text-decoration: none;
  }

  .v-card__actions {
    position: absolute;
    bottom: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    opacity: 1;
    transition: opacity 0.6s ease-out;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transition: opacity 0.6s ease-out;
  }

  .slide-left-enter-active {
    animation: slide-in 1.5s ease-in;
  }

  .slide-left-leave-active {
    animation: slide-out 1.5s ease-out forwards;
  }

  .slide-left-enter-active {
    animation: slide-in-left 1s ease-in;
  }

  .slide-left-leave-active {
    animation: slide-out-left 1s ease-out forwards;
  }

  @keyframes slide-in-left {
    from {
      transform: translateX(2000px);
    }

    to {
      transform: translateX(0);
    }
  }

  @keyframes slide-out-left {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(2000px);
    }
  }
</style>


