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
    },

    SET_CHOOSEN_BOOK_LIST(state, payload) {
      // const { length } = state.bookList
      const found = state.bookList.findIndex(el => el.link === payload.link)
      if (found > -1) {
        const newBooks = state.bookList.slice(found, 1)
        state.bookList = newBooks
      } else state.bookList.push(payload)
      return state.bookList
    },

    removeChoosenBookList(state, payload) {
      // const { length } = state.bookList
      const found = state.bookList.some(el => el.link === payload.link)
      if (found) state.bookList.slice(payload)
      return state.bookList
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
        })
    },

    defaultBookList({ commit, state }, payload) {
      commit('SET_LIST', payload)
    },

    choosenBookList({ commit, state }, payload) {
      commit('SET_CHOOSEN_BOOK_LIST', payload)
    }
  }
})
