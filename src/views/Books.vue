<template>
  <div class="home">
    <div>
      <v-jumbotron color="#222222" dark height="600px" class="jumbotron">
        <v-container fill-height>
          <v-layout align-center class="container">
          <transition name="fade">

            <v-flex text-xs-center class="jumbotron-container">
              <h3 class="display-3" v-if="!showCalendar">NYT Best Sellers List</h3>
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
           <div class="change-layout"><span class="mr-3">Change layout</span><span @click="changeLayout = true" class="click mr-3"><v-icon small class="click mr-2">fas fa-columns</v-icon>4 cols</span><span @click="changeLayout = false" class="click"><v-icon small class="mr-2">fas fa-columns</v-icon>3 cols</span></div>

          </v-layout>
        </v-container>
      </v-jumbotron>
   
    </div>



    <v-layout row wrap class="container-grid">
      <v-flex xs12 sm6 :lg4="!changeLayout" :lg3="changeLayout" v-for='(item, index) in showBooks' class="grid-item">
        <v-card height="100%">
          <v-alert
            :value="true"
            color="orange"
            class="rank"
          >
            {{item.rank}}
          </v-alert>
          <v-img
          contain
            :src="item.book_image"
            aspect-ratio=".75"

          ></v-img>
          <v-icon medium @click="choosenBook(item, $event)" class="save">{{output}}</v-icon>
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
      showCalendar:false,
      changeLayout: false,
      output: 'far fa-star'

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
      },
      choosenBook(item, event) {
        let choosenBooks = {
          author: item.author,
          link: item.amazon_product_url,
          title: item.title,
          status: 'clicked'
        }

        console.log(event.target)
        var el = event.target;
        el.classList.remove('far')
        el.classList.add('fas')
        this.$store.dispatch('choosenBookList', choosenBooks)


      }
  },

  computed: {
    showBooks() {
      return this.$store.state.books

    },

    fourColumns() {
      return ''
    }
  }
}


</script>

<style lang="scss" scoped>

.change-layout {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: -100px;

  @media only screen and (max-width: 1263px) {
    display: none;
  }
}



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

.v-alert >div{

    font-size: 30px;

}

.v-card {
  margin: 0 50px;
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

.click {
  cursor: pointer;
}
.save {
      float: right;
    margin-top: 40px;
    background: transparent;
    -webkit-text-fill-color: orange;
}
.likeClass {
  border: 1px solid red;
}


</style>

