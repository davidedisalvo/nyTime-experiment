<template>
  <div class="booklist">

<v-layout row class="mt-3">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="orange" dark>
            <h3>My books</h3>

          <v-spacer></v-spacer>


        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in showingBooks">


            <v-divider
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-tile
              :key="item.title"
              avatar
            >

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.author"></v-list-tile-sub-title>
                          
                <!-- <v-btn><a :href="item.link">Buy it now</a></v-btn> -->

              </v-list-tile-content>
              <v-card-actions>
            <a :href="item.link" target="_blank">
            <v-btn flat color="orange"> Buy now</v-btn>
            </a>
            
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
import axios from 'axios'
export default {
  data: () => ({
      
    }),

    computed: {
        showingBooks() {
            
            return this.$store.state.bookList
        }
    }
   
}
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
