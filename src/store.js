import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'

export default new Vuex.Store({
  state: {
    books: [],
    articles: [],
    bookList: [],
    articleList: [],
    dataError: ''
  },
  mutations: {
    SET_BOOKLIST(state, books) {
      state.bookList = books
    },

    SET_ARTICLELIST(state, articles) {
      state.articleList = articles
    },

    SET_LIST(state, payload) {
      let value = payload.data.results.books

      if (!state.books) {
        state.books.push(...value)
      } else {
        state.books = [...value]
        
      }
    },

    SET_LIST_ARTICLES(state, payload) {
      let value = payload.data.response.docs
      if (state.articles.length < 0) {
        state.articles.push(...value)
      } else {
        state.articles = []
        state.articles.push(...value)
      }
    }
  },
  actions: {
    getting_books({ commit, state }, payload) {
      axios
        .get(
          'https://api.nytimes.com/svc/books/v3/lists/' +
            payload +
            '/hardcover-fiction.json?api-key=9J6zrwrvlHJCVne4scXFympyYEGkgmJk'
        )
        .then(response => {
          console.log(response)
          commit('SET_LIST', response)
        })
    },

    getting_articles({ commit, state }, payload) {
      axios
        .get(
          'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
            payload.query +
            '&fq=news_desk:("' +
            payload.selections +
            '")&api-key=9J6zrwrvlHJCVne4scXFympyYEGkgmJk'
        )
        .then(response => {
          commit('SET_LIST_ARTICLES', response)
          console.log(response)
        })
    },

    defaultBookList({ commit, state }, payload) {
      commit('SET_LIST', payload)
    }
  }
})
