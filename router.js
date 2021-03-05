import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/HomePage'
import PostsPage from '@/components/PostsPage'
import AlbumsPage from '@/components/AlbumsPage'
import ToDoSPage from '@/components/ToDoPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/posts',
    component: PostsPage
  },
  {
    path: '/todos',
    component: ToDoSPage
  },
  {
    path: '/albums',
    component: AlbumsPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router