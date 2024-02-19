/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// 引用中文包
import { zhHant } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        colors: {
          // primary: '#1867C0',
          // secondary: '#5CBBF6',
          primary: '#818B76',
          secondary: '#E16845',
          secondary2: '#EEAE8E',
          warning: '#EFB158',
          back: '#F8F4EB',
          backdark: '#F6E8D2'
        }
      }
    }
  },
  locale: {
    locale: 'zhHant',
    messages: { zhHant }
  }
})
