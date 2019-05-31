<template>
  <div id="app">
    <v-toolbar fixed>
      <v-toolbar-title>
        <v-btn flat>
          <router-link to="/bookList">Book list: {{Object.keys($store.state.bookList).length}}</router-link>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>
          <router-link to="/">Home</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/articles">About</router-link>
        </v-btn>
      </v-toolbar-items>
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
  /* local styles */
</style> 


