// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
import { useApi } from '@/composables/axios'

// ===== 定義 user store   // 寫成 setup 語法用 () => {}
export const useUserStore = defineStore('user', () => {
  const { apiAuth } = useApi()

  const token = ref('')
  const account = ref('')
  const email = ref('')
  const cart = ref(0) // 購物車商品總數量
  const role = ref(UserRole.USER)
  const avatar = ref('')
  const likes = ref([]) // likes 清單陣列

  // === login 登入時修改成傳入的資料
  const login = (data) => {
    if (data.token) {
      token.value = data.token
    }
    account.value = data.account
    email.value = data.email
    cart.value = data.cart
    role.value = data.role
    avatar.value = data.avatar
    likes.value = data.likes
  }

  // === isLogin 判斷是否登入狀態
  const isLogin = computed(() => {
    return token.value.length > 0
  })
  // === isAdmin 判斷是否是管理員
  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  // === getProfile 第一次進到頁面後用 apiAuth 取得使用者資料
  const getProfile = async () => {
    if (token.value.length === 0) return
    try {
      // data 是後端 '/users/me' 的回應，也就是後端 getProfile 的回應，裡面有使用者資料
      const { data } = await apiAuth.get('/users/me')
      // 把後端回應的 likes 陣列轉換成商品 id 的陣列，原本是 likes: [{ product: '_id' }]
      data.result.likes = data.result.likes.map((item) => item.product)
      login(data.result)
    } catch (error) {
      logout()
    }
  }

  // === logout 登出時清空資料
  const logout = () => {
    token.value = ''
    account.value = ''
    email.value = ''
    cart.value = 0
    role.value = UserRole.USER
    avatar.value = ''
    likes.value = []
  }

  return {
    token,
    account,
    email,
    cart,
    role,
    avatar,
    likes,
    login,
    logout,
    isLogin,
    isAdmin,
    getProfile
  }
},
// ===== 存到 localStorage 的設定
// 先安裝 pinia-plugin-persistedstate，再到 store 的 index.js 設定
{
  persist: {
    // key 是存在 localStorage 的 key
    key: 'beetle_factory_user',
    // 只存 token，其他資料呼叫時再取得
    paths: ['token']
  }
}
)
