import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'

export default new Vuex.Store({
  state: {
    books: []
  },
  mutations: {
    SET_NEW_LIST(state, payload) {
      let value = payload.data.results.books
     
      if(state.books.length < 0) {

        state.books.push(...value)
        console.log('first call')
      } else {
        state.books = []
        state.books.push(...value)

        console.log('second call')

      }
      
      
    },

    SET_DEFAULT_LIST(state, payload) {
      if(state.books.length < 0) {

        state.books.push(...payload)
        console.log('first call')
      } else {
        state.books = []
        state.books.push(...payload)

        console.log('second call')

      }
    }
  },
  actions: {
    getting_books({ commit, state}, payload) {
      axios.get('https://api.nytimes.com/svc/books/v3/lists/'+payload+'/hardcover-fiction.json?api-key=9J6zrwrvlHJCVne4scXFympyYEGkgmJk')
      .then(response => {
        var value = response
        console.log(response)
        commit('SET_NEW_LIST', value)
    })
    },

    defaultBookList({ commit, state}, payload) {
      commit('SET_DEFAULT_LIST', payload.data.results.books)
    }
  },
  getters: {

  }
})
