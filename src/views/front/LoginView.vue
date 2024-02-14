<template>
  <VContainer class="d-flex align-center">
    <VRow>

      <VCol cols="12" md="6" offset-md="3">
        <VCard class="mx-auto pa-8 pb-8 card" elevation="8" max-width="448" rounded="xl" align-self="center">
          <VCardTitle class="pb-5">登入</VCardTitle>
          <VCardText>
            <VForm :disabled="isSubmitting" @submit.prevent="submit">
              <VTextField class="pb-3" label="帳號" placeholder="User name" hint="4~20字 英文或數字"
                density="compact" variant="outlined" minlength="4" maxlength="20" counter  prepend-inner-icon="mdi-account-outline"
                v-model="account.value.value"
                :error-messages="account.errorMessage.value">
              </VTextField>
              <VTextField class="pb-3" label="密碼" placeholder="輸入密碼" hint="4~20字"
                density="compact" variant="outlined" minlength="4" maxlength="20" counter :type="show1 ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-outline" :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="show1 = !show1"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value">
              </VTextField>
              <VBtn type="submit" color="secondary" rounded="xl">Sign in</VBtn>
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
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// 路由
import { useRouter } from 'vue-router'
// 提示訊息
import { useSnackbar } from 'vuetify-use-dialog'
// api composables
import { useApi } from '@/composables/axios'
// user 的 store
import { useUserStore } from '@/store/user'

const { api } = useApi()

const router = useRouter()
const createSnackbar = useSnackbar()

const user = useUserStore()

// ===== 密碼顯示切換
const show1 = ref(false)

// ==================== 前端表單驗證 ====================
// === 定義註冊表單的資料格式
const schema = yup.object({
  account: yup
    .string()
    .required('使用者帳號必填')
    .min(4, '帳號名稱最少 4 字')
    .max(20, '帳號名稱最多 20 字'),
  password: yup
    .string()
    .required('使用者密碼必填')
    .min(4, '密碼最少 4 字')
    .max(20, '密碼最多 20 字')
})
// === 先 useForm -> 表單驗證方式綁定 schema
// handleSubmit 表單送出時的處理函式；isSubmitting 是否正在送出
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})
// === 再 useField -> 建立表單欄位
// 要跟上面 schema 的名稱對到，例如 'account'
const account = useField('account')
const password = useField('password')
// ====================================================

// ===== 登入表單送出處理函式
const submit = handleSubmit(async (values) => {
  try {
    // 送出表單資料到後端
    const { data } = await api.post('/users/login', {
      // 要送出的東西，這裡的 key 要跟後端接收的欄位名稱一樣
      account: values.account,
      password: values.password
    })
    // 登入成功後，把結果丟進 user store 的 login function
    user.login(data.result) // data 是後端整個回覆，包括是否成功、錯誤訊息、資料，result 是資料
    // 登入成功通知
    createSnackbar({
      text: '登入成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'primary',
        location: 'bottom'
      }
    })
    // 跳轉到首頁
    router.push('/')
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    // 登入失敗通知
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
.card{
  background-color: #F8F4EB;
}
.v-container{
  height: 100%;
}
</style>
