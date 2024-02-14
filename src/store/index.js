// Utilities
import { createPinia } from 'pinia'
// 把 pinia 存在 localStorage
import persistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persistedstate)

export default pinia
