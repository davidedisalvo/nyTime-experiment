<template>
  <div class="article">
    <v-form>
    <v-container>
      <v-layout row wrap justify-center>

        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="query"
            label="Type your subject"
            outline
          ></v-text-field>
        </v-flex>
      
   
      </v-layout>
    </v-container>
    
    </v-form>
    <v-container fluid grid-list-xl>
      <h3>Filter by category</h3>
    <v-layout row wrap justify-center align-center>
          <v-flex xs12 sm6 d-flex>
        <v-select
        v-model="selection"
          :items="items"
          label="Outline style"
          outline
          attach
        ></v-select>
      </v-flex>
      </v-layout>
    </v-container>
     <v-btn  @click="gettingArticles()">TRYY</v-btn>
      <v-layout row wrap class="container-grid">
      <v-flex xs12 sm6 lg4 v-for='item in showArticles' class="grid-item">
        <v-card height="100%">
          <v-img
          contain
            :src="item.book_image"
            aspect-ratio=".75"
          ></v-img>

          <v-card-title primary-title >
            <div class='card-body-container'>
              <h3 class="headline mb-0">{{item.multimedia.rank}}</h3>
              <div>
                <h4></h4>
                <p>
                 
                </p>
                
              </div>
            </div>
          </v-card-title>

          <v-card-actions>
            <a :href="item.amazon_product_url" target="_blank">
            <v-btn flat color="orange"> Buy now</v-btn>
            </a>
            
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      items: [
        'Arts', 'Fashion', 'Food', 'Politics', 'Science', 'Sports', 'Weather', 'World'
      ],
      query: '',
      selection: ''
    }
  },
  methods: {
    gettingArticles() {
        let filter = {
          query: this.query,
          selections: this.selection
        }
      this.$store.dispatch('getting_articles', filter)
    },

 
    
  },

  computed: {
    showArticles() {
      return this.$store.state.articles
    }
    }


}
</script>

<style lang="scss" scoped>
.v-menu__content {

  top: 0 !important;
    left: 16px;

}
</style>


