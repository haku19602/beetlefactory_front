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

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(VuetifyUseDialog)
    .use(pinia)
    .use(router)
}
