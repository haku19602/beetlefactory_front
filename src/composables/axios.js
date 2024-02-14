import { useUserStore } from '@/store/user'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

// ============================ axios 請求攔截器 ============================
/*
  axios 攔截器執行順序 ----------
  1. 呼叫 axios.get / axios.post 時
  2. 進到 interceptors.request 請求攔截器
  3. 送出請求
  4. 進到 interceptors.response 回應攔截器
  5. 進到呼叫的地方的 .then() .catch()
*/

// ===== request 送出請求前執行
apiAuth.interceptors.request.use((config) => { // config 是 axios 請求的設定
  const user = useUserStore()
  // 將使用者 token 加到請求的 header
  config.headers.Authorization = 'Bearer ' + user.token // 'Bearer ' 有空格!
  return config
})

// ===== response 收到回應後執行
// apiAuth.interceptors.response(成功時執行, 失敗時執行)
apiAuth.interceptors.response.use(
  // === 成功時執行
  (res) => {
    return res
  },
  // === 失敗時執行
  (error) => {
    // --- 如果失敗有收到回應
    if (error.response) {
      // - 如果錯誤是 jwt 過期
      if (
        // 如果錯誤是 jwt 過期，且不是舊換新請求路徑
        error.response.data.message === 'JWT 過期' &&
        error.config.url !== '/users/extend'
      ) {
        const user = useUserStore()
        // 傳送舊換新請求
        return apiAuth
          .patch('/users/extend')
          .then(({ data }) => {
            // 更新 pinia 保存的 token
            user.token = data.result
            // 修改發生錯誤的原請求設定的 jwt
            error.config.headers.Authorization = 'Bearer ' + user.token
            // 重新傳送原請求
            return axios(error.config)
          })
          .catch(() => {
            // 如果舊換新失敗，登出
            user.logout()
            // 回傳原錯誤到呼叫的地方
            return Promise.reject(error) // axios 要求回傳 Promise
          })
      }
    }
    // - 如果請求沒回應，或不是過期的錯誤，回傳原錯誤到呼叫的地方
    return Promise.reject(error)
  }
)
/*
  舉例，進到 apiAuth.get('/users/me') 的執行順序 ----------
  1.   apiAuth.get('/users/me')
  2-1. 如果不是 JWT 過期錯誤，將 apiAuth.get('/users/me') 的錯誤回傳
  2-2. 如果是 JWT 過期錯誤，進到 3
  3.   傳送舊換新請求
  3-1. 如果舊換新成功，修改 apiAuth.get('/users/me') 的 jwt 為新的後送出
  3-2. 如果舊換新失敗，將 apiAuth.get('/users/me') 的錯誤回傳
*/
// ==================================================================

// ===== export useApi，讓我們可以在任何地方使用 api 和 apiAuth
export const useApi = () => {
  return { api, apiAuth }
}
