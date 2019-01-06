import VueRouter from 'vue-router'

import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Users from '@/components/users/Users'

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '/users',
      component: Users
    }]
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  }
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
