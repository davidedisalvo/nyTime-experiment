import Vue from 'vue'
import Router from 'vue-router'
import Books from './views/Books.vue'
import BookList from './components/BookList.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'books',
      component: Books
    },

    {
      path: '/booklist',
      name: 'booklist',
      component: BookList
    },
    {
      path: '/articles',
      name: 'articles',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Articles.vue')
    }
  ]
})
