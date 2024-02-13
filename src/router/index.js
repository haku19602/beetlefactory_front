// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // ===== 前台 FrontLayout
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '', // 空字串代表這個路由是預設路由
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: '甲蟲工廠 BeetleFactory'
          // login: false, // 不用登入也能看
          // admin: false // 不是管理員也能看
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: '甲蟲工廠 BeetleFactory | 註冊'
          // login: false,
          // admin: false
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: '甲蟲工廠 BeetleFactory | 登入'
          // login: false,
          // admin: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// ===== 進到每個路由改 title
router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
