/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
// 通知訊息
import VuetifyUseDialog from 'vuetify-use-dialog'
// 裝圖片上傳套件 vue-file-agent，官方只有 vue 2，到 npm 找 vue 3 版本
import VueFileAgentNext from '@boindil/vue-file-agent-next'
import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(VuetifyUseDialog)
    .use(pinia)
    .use(router)
    .use(VueFileAgentNext)
}
