import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'

export default new Vuex.Store({
  state: {
    books: [],
    articles: [],
    bookList: []
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
    },

    SET_NEW_LIST_ARTICLES(state, payload) {
      let value = payload.data.response.docs
      if(state.articles.length < 0) {

        state.articles.push(...value)
        console.log('first call')
      } else {
        state.articles = []
        state.articles.push(...value)

        console.log('second call')

      }
    },

    SET_CHOOSEN_BOOK_LIST(state, payload) {
      var arr = state.bookList;

  
        const { length } = arr;
        const id = length + 1;
        const found = arr.some(el => el.link === payload.link);
        if (!found) arr.push(payload);
        return arr;
    },

    removeChoosenBookList(state, payload) {


      var arr = state.bookList;

  
        const { length } = arr;
        const id = length + 1;
        const found = arr.some(el => el.link === payload.link);
        if (found) arr.slice(payload);
        return arr;
      

     
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

    getting_articles({commit, state}, payload) {
      console.log(payload.query)
      axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+payload.query+'&fq=news_desk:("'+payload.selections+'")&api-key=9J6zrwrvlHJCVne4scXFympyYEGkgmJk')
      .then(response => {
        var value = response
        console.log(response)
        commit('SET_NEW_LIST_ARTICLES', value)
    })
      
    },

    defaultBookList({ commit, state}, payload) {
      commit('SET_DEFAULT_LIST', payload.data.results.books)
    },

    choosenBookList({ commit, state}, payload) {
      commit('SET_CHOOSEN_BOOK_LIST', payload)
    }
  },
  getters: {

  }
})
