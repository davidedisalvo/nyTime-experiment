<template>
  <div id="app">
    <v-toolbar fixed>
         
      <v-toolbar-title>
        <v-btn flat>
          <router-link to="/favourite">Book list: {{Object.keys($store.state.bookList).length}}</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/favourite">Article list: {{Object.keys($store.state.articleList).length}}</router-link>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items >
        <v-btn flat>
          <router-link to="/">BOOKS</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/articles">ARTICLES</router-link>
        </v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-sm-and-up drawer">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
                  <v-icon>fas fa-times</v-icon>

        <v-list>
            <v-btn flat>
              <router-link to="/">BOOKS</router-link>
            </v-btn>
            <v-btn flat>
              <router-link to="/articles">ARTICLES</router-link>
            </v-btn>
        </v-list>
      </v-menu>
    </v-toolbar>

    <router-view/>
  </div>
</template>

<style src='vuetify/dist/vuetify.min.css'>
  /* global styles */
</style> 

<style lang="scss" scoped>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .v-btn__content {
    a {
      text-decoration: none;

      color: black;
    }
  }

  @media only screen and (max-width: 600px) {
    .v-menu>.v-menu__content {
      width: 100%;
      position: absolute;
      left: 0 !important;
      top:0 !important;
      height: 50vh;
      background: orange;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .v-list {
      background: transparent;
      display: flex;
      flex-direction: column;
      color: white;
      font-size: 20px;

      .theme--light.v-btn {
      font-size: 20px;
      font-weight: bold;
      a{
                color: white;

      }
      }
    }

    .v-toolbar__items {
      display: none;
    }

    .fa-times:before {
      position: absolute;
      top: 0;
      right: 0;
      padding: 20px;
    }

    .v-toolbar__title {
      .v-btn {
        padding: 0;
      }
    }
  }
  /* local styles */
</style> 


