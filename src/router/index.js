// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'

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
          title: '甲蟲工廠 BeetleFactory',
          login: false, // 不用登入也能看
          admin: false // 不是管理員也能看
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: '甲蟲工廠 | 註冊',
          login: false,
          admin: false
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: '甲蟲工廠 | 登入',
          login: false,
          admin: false
        }
      },
      {
        path: 'book',
        name: 'Book',
        component: () => import('@/views/front/BookView.vue'),
        meta: {
          title: '甲蟲工廠 | 飼養攻略',
          login: false,
          admin: false
        }
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('@/views/front/ShopView.vue'),
        meta: {
          title: '甲蟲工廠 | 商店',
          login: false,
          admin: false
        }
      },
      {
        path: 'products/:id',
        name: 'Product',
        component: () => import('@/views/front/ProductEach.vue'),
        meta: {
          title: '甲蟲工廠 | 商品',
          login: false,
          admin: false
        }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/front/CartView.vue'),
        meta: {
          title: '甲蟲工廠 | 購物車',
          login: true,
          admin: false
        }
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/front/MyView.vue'),
        meta: {
          title: '甲蟲工廠 | 我的',
          login: true,
          admin: false
        }
      },
      {
        path: 'mysetting',
        name: 'Mysetting',
        component: () => import('@/views/front/MySetting.vue'),
        meta: {
          title: '甲蟲工廠 | 會員設定',
          login: true,
          admin: false
        }
      },
      {
        path: 'myorders',
        name: 'MyOrders',
        component: () => import('@/views/front/MyOrders.vue'),
        meta: {
          title: '甲蟲工廠 | 我的訂單',
          login: true,
          admin: false
        }
      },
      {
        path: 'mylikes',
        name: 'MyLikes',
        component: () => import('@/views/front/MyLikes.vue'),
        meta: {
          title: '甲蟲工廠 | 我的收藏',
          login: true,
          admin: false
        }
      },
      {
        path: 'orders/:id',
        name: 'Orders',
        component: () => import('@/views/front/OrdersDetails.vue'),
        meta: {
          title: '甲蟲工廠 | 訂單明細',
          login: true,
          admin: false
        }
      }
    ]
  },
  // ===== 後台 AdminLayout
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/HomeView.vue'),
        meta: {
          title: '甲蟲工廠 | 後台管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/ProductsView.vue'),
        meta: {
          title: '甲蟲工廠 | 商品管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/admin/OrdersView.vue'),
        meta: {
          title: '甲蟲工廠 | 訂單管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'members',
        name: 'AdminMembers',
        component: () => import('@/views/admin/MembersView.vue'),
        meta: {
          title: '甲蟲工廠 | 會員管理',
          login: true,
          admin: true
        }
      }
    ]
  }
  // ===== 404 頁面
  // {
  //   path: '/404',
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFoundView.vue'),
  //   meta: {
  //     title: '購物網 | 找不到',
  //     login: false,
  //     admin: false
  //   }
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'All',
  //   redirect: '/404'
  // }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// ===== .afterEach 進到每個路由後改 title
router.afterEach((to, from) => {
  document.title = to.meta.title
})

// ===== .beforeEach 進到每個路由前判斷登入狀態
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  // === 如果是第一次跳轉進入頁面，取得使用者資料
  if (from === START_LOCATION) {
    await user.getProfile()
  }

  // === 登入、管理員狀態判斷
  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    // 如果有登入，要去註冊或登入頁，重新導向回首頁
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    // 如果要去的頁面要登入，但是沒登入，重新導向回登入頁
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    // 如果要去的頁面要管理員，但是不是管理員，重新導向回首頁
    next('/')
  } else {
    // 其他情況，正常進入
    next()
  }
})

export default router
