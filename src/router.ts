import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import CreateColumn from '@/views/CreateColumn.vue'
import store from './store'
const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/column/:id', name: 'column', component: ColumnDetail },
  {
    path: '/create-column',
    name: 'create-column',
    component: CreateColumn,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/create-post',
    name: 'create-post',
    component: CreatePost,
    meta: {
      requiredLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
