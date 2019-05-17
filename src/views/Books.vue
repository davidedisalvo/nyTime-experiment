<template>
  <div class="home">
    <div>
      <v-jumbotron color="#222222" dark height="600px" class="jumbotron">
        <v-container fill-height>
          <v-layout align-center class="container">
          <transition name="fade">

            <v-flex text-xs-center class="jumbotron-container">
              <h3 class="display-3" v-if="!showCalendar">NYT Best Sellers Lists</h3>
                <v-btn @click="showCalendar = true" v-if="!showCalendar" color="orange darken-2" dark>
                  Search by date<v-icon small class="ml-3">fas fa-arrow-right</v-icon>
                </v-btn>
            </v-flex>
            </transition>

            <transition name="slide-left">
              <v-flex text-xs-center v-if="showCalendar" class="calendar" >
                  <helloWorld></helloWorld>
              </v-flex>
            </transition>

          </v-layout>
        </v-container>
      </v-jumbotron>
    </div>



    <v-layout row wrap class="container-grid">
      <v-flex xs12 sm6 lg4 v-for='item in showBooks' class="grid-item">
        <v-card height="100%">
          <v-alert
            :value="true"
            color="orange"
          >
            {{item.rank}}
          </v-alert>
          <p class="rank"></p>
          <v-img
          contain
            :src="item.book_image"
            aspect-ratio=".75"
          ></v-img>

          <v-card-title primary-title >
            <div class='card-body-container'>
              <h3 class="headline mb-0">{{item.author}}</h3>
              <div>
                <h4>{{item.title}}</h4>
                <p>
                  {{item.description}}
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
import helloWorld from '../components/HelloWorld.vue'
import { TweenMax } from 'greensock'

export default {
  name: 'home',
  components: {helloWorld},

  data() {
    return {
      books: [],
      gradient: 'to top, rgb(34, 32, 34), rgb(140, 133, 142)',
      showCalendar:false

    }
  },

  mounted() {
    var self = this;
      axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=9J6zrwrvlHJCVne4scXFympyYEGkgmJk')
      .then(response => {
      let value = response
      this.$store.dispatch('defaultBookList', value)
    })
    .then(()=> {
      var findClass = document.getElementsByClassName('card-body-container');
      var tallest = 0; 
      var i;
      // Loop over matching divs
      for(i = 0; i < findClass.length; i++) {
        var ele = findClass[i];
        var eleHeight = ele.offsetHeight;
        tallest = (eleHeight>tallest ? eleHeight : tallest); /* look up ternary operator if you dont know what this is */
      }
      for(i = 0; i < findClass.length; i++) {
        findClass[i].style.height = tallest + "px";
      }
    })
    .catch((error)=> {
      console.log(error)
    })
    this.animate();
  },


  methods: {
      animate: function() {
          TweenMax
          .to(".container-grid", .9, {x: 0, autoAlpha:1,  ease:Sine.easeIn});
      }
  },

  computed: {
    showBooks() {
      return this.$store.state.books
    }
  }
}


</script>

<style lang="scss" scoped>

.jumbotron-container {
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-content: center;
  align-items: center;
}

.v-image__image--cover {
  background-size: contain !important;
}

.v-card {
  margin: 0 100px;
}

.grid-item {
  margin-bottom: 50px;
}

.container {
  flex-direction: column;
}

.search {
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  opacity: 1;
  transition: opacity .6s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity .6s ease-out;
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
    transform: translateX(2000px)
  }

  to {
    transform: translateX(0)
  }
}

@keyframes slide-out-left {
  from {
    transform: translateX(0)
  }

  to {
    transform: translateX(2000px)
  }
}
.container-grid {
  margin-top: 20px;
}

.card-body-container {
  h4 {
    margin-bottom: 15px;
  }
}

.rank {
  font-size: 30px;
  font-weight: bold;
}

.container-grid {
  transform: translateX(-400px)
}

a {
  text-decoration: none;
}


</style>

