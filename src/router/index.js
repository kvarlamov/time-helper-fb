import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Registration.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/logon',
    name: 'Login',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Login.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes  
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('beforeEach');
    store.getters.checkUser ? next() : next('/logon');
  } else {
    next()
  }
})

export default router
