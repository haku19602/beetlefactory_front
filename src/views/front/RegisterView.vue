<template>
  <VContainer class="d-flex align-center" style="height: 90%;">
    <VRow>

      <VCol cols="12" md="6" offset-md="3">
        <VCard class="mx-auto pa-8 pb-8 bg-back" elevation="8" max-width="448" rounded="xl" align-self="center">
          <VCardTitle class="pb-5">註冊</VCardTitle>
          <VCardText>
            <VForm :disabled="isSubmitting" @submit.prevent="submit">
              <VTextField class="pb-3" label="信箱" placeholder="aaaa@gmail.com"
                density="compact" variant="outlined" type="email"
                prepend-inner-icon="mdi-email-outline"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value">
              </VTextField>
              <VTextField class="pb-3" label="帳號" placeholder="User name" hint="4~20字 英文或數字"
                density="compact" variant="outlined" minlength="4" maxlength="20" counter prepend-inner-icon="mdi-account-outline"
                v-model="account.value.value"
                :error-messages="account.errorMessage.value">
              </VTextField>
              <VTextField class="pb-3" label="密碼" placeholder="請輸入密碼" hint="4~20字"
                density="compact" variant="outlined" minlength="4" maxlength="20" counter :type="show1 ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-outline" :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="show1 = !show1"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value">
              </VTextField>
              <VTextField class="pb-3" label="確認密碼" placeholder="請再次輸入密碼" hint="4~20字"
                density="compact" variant="outlined" minlength="4" maxlength="20" counter :type="show2 ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-outline" :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="show2 = !show2"
                v-model="passwordConfirm.value.value"
                :error-messages="passwordConfirm.errorMessage.value">
              </VTextField>
              <VBtn type="submit" color="secondary" rounded="xl">Sign up</VBtn>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>

    </VRow>
  </VContainer>
</template>

<script setup>
import { ref } from 'vue'
// 表單驗證套件
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'

const { api } = useApi()

const router = useRouter()
const createSnackbar = useSnackbar()

// ===== 密碼顯示切換
const show1 = ref(false)
const show2 = ref(false)

// ==================== 前端表單驗證 ====================
// === 定義註冊表單的資料格式
const schema = yup.object({
  account: yup
    .string()
    .required('使用者帳號必填')
    .min(4, '帳號名稱最少 4 字')
    .max(20, '帳號名稱最多 20 字'),
  email: yup
    .string()
    .required('使用者信箱必填')
    // .test(自訂驗證名稱, 錯誤訊息, 驗證function)
    .test('isEmail', '信箱格式錯誤', (value) => {
      return validator.isEmail(value)
    }),
  password: yup
    .string()
    .required('使用者密碼必填')
    .min(4, '密碼最少 4 字')
    .max(20, '密碼最多 20 字'),
  passwordConfirm: yup
    .string()
    .required('使用者密碼必填')
    .min(4, '密碼最少 4 字')
    .max(20, '密碼最多 20 字')
    // .oneOf 只允許符合陣列內其中一個值
    // .oneOf(陣列, 錯誤訊息)     .ref('password') 代表這個 schema 的 password 欄位值
    .oneOf([yup.ref('password')], '密碼不一致')
})
// === 先 useForm -> 表單驗證方式綁定 schema
// handleSubmit 表單送出時的處理函式；isSubmitting 是否正在送出
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})
// === 再 useField -> 建立表單欄位
// 要跟上面 schema 的名稱對到，例如 'account'
const account = useField('account')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')
// ====================================================

// ===== 註冊表單送出處理函式
const submit = handleSubmit(async (values) => {
  try {
    await api.post('/users', {
      // 要送出的東西，這裡的 key 要跟後端接收的欄位名稱一樣
      account: values.account,
      email: values.email,
      password: values.password
    })
    // 註冊成功通知
    createSnackbar({
      text: '註冊成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'back',
        location: 'bottom'
      }
    })
    // 跳轉到登入頁
    router.push('/login')
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    // 註冊失敗通知
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'secondary',
        location: 'bottom'
      }
    })
  }
})
</script>

<!-- ------------------------------------------------------ -->

<style lang="scss" scoped>
</style>
