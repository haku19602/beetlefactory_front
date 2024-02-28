<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow class="justify-center pt-10">
        <!-- ===== 選擇項目！！！ -->
        <VCol cols="5" sm="4" md="3" lg="2">
          <VCard class="mx-auto" max-width="300" flat="0" width="200">
            <VList density="compact" class="bg-back">
              <VListItem v-for="(item, i) in items" :key="i" :to="item.to" :prepend-icon="item.icon" :title="item.text" color="primary" rounded="xl"></VListItem>
            </VList>
          </VCard>
        </VCol>

        <VCol cols="8" sm="7" md="9" lg="4" class="text-center">
          <VAvatar :image="user.avatar" size="260"></VAvatar>
          <VBtn icon="mdi-pencil" size="x-small" color="primary" style="vertical-align: bottom;" @click="openDialog"></VBtn>
          <h2 class="text-primary">{{ user.account }}</h2>
          <h3 class="text-primary">{{ user.email }}</h3>
        </VCol>

        <!-- 會員資料卡 -->
        <VCol cols="12" sm="11" md="12" lg="6">
          <VCard class="bg-back" >
            <VToolbar flat color="primary">
              <VIcon class="ps-8">mdi-account</VIcon>
              <VToolbarTitle class="font-weight-bold">會員資料</VToolbarTitle>

              <VSpacer></VSpacer>

              <VBtn icon>
                <VFadeTransition leave-absolute>
                  <VIcon v-if="isEditing" @click="cancel">mdi-close</VIcon>
                  <VIcon v-else @click="isEditing = true">mdi-pencil</VIcon>
                </VFadeTransition>
              </VBtn>
            </VToolbar>

            <VForm :disabled="!isEditing || isSubmitting" @submit.prevent="submit">
              <VCardText class="pa-10">
                <VRow>
                  <VCol cols="12" class="pb-0">
                    <VTextField label="信箱" variant="outlined" density="comfortable"
                    v-model="email.value.value" :error-messages="email.errorMessage.value"></VTextField>
                  </VCol>

                  <VCol cols="12" class="pb-0">
                    <VTextField label="帳號" variant="outlined" density="comfortable"
                    v-model="account.value.value" :error-messages="account.errorMessage.value"></VTextField>
                  </VCol>

                  <VCol cols="6" class="pb-0">
                    <VTextField label="常用收件人" variant="outlined" density="comfortable"
                    v-model="name.value.value" :error-messages="name.errorMessage.value"></VTextField>
                  </VCol>

                  <VCol cols="6" class="pb-0">
                  <VTextField label="常用收件電話" variant="outlined" density="comfortable"
                  v-model="phone.value.value" :error-messages="phone.errorMessage.value"></VTextField>
                  </VCol>

                  <VCol cols="12" class="pb-0">
                  <VTextField label="常用收件地址" variant="outlined" density="comfortable"
                  v-model="address.value.value" :error-messages="address.errorMessage.value"></VTextField>
                  </VCol>

                </VRow>
              </VCardText>

              <VDivider></VDivider>

              <VCardActions>
                <VSpacer></VSpacer>
                <VBtn type="submit" color="primary" rounded :disabled="!isEditing" :loading="isSubmitting">儲存</VBtn>
              </VCardActions>
            </VForm>
          </VCard>

          <!-- <VCard>
            <VCol cols="12" class="pb-0">
              <VTextField label="重設密碼" variant="outlined" density="comfortable"
              v-model="user.password"></VTextField>
            </VCol>
          </VCard> -->

        </VCol>
      </VRow>
    </VContainer>

    <!-- 換大頭貼對話框 -->
    <VDialog v-model="dialogAvatar" width="300px">
      <VCard rounded="xl" class="px-5 pt-5">
        <VueFileAgent v-model="fileRecords" v-model:rawModelValue="rawFileRecords"
          accept="image/jpeg,image/png" max-size="2MB" :error-text="{type: '檔案格式不支援，只接受 .jpeg .png', size: '檔案超過 2MB 大小限制'}"
          deletable help-text="選擇大頭貼圖片或拖曳到這裡" :max-files="1" ref="fileAgent"
          ></VueFileAgent>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color="secondary" rounded @click="closeDialog" :disabled="avatarSubmiting">取消</VBtn>
          <VBtn color="primary" rounded @click="editAvatar" :loading="avatarSubmiting">送出</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
  <!-- ------------------------------------------------------------------------ -->

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
// 表單驗證套件
import validator from 'validator'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const user = useUserStore()
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const items = [
  { to: '/mysetting', text: '會員設定', icon: 'mdi-cog' },
  { to: '/mylikes', text: '我的收藏', icon: 'mdi-heart' },
  { to: '/myorders', text: '我的訂單', icon: 'mdi-list-box' }
]

// ===== 會員資料編輯狀態
const isEditing = ref(false)

// ===== 重設 VueFileAgent 上傳的檔案用的
const fileAgent = ref(null)
// ===== 表單對話框的開啟狀態
const dialogAvatar = ref(false)

// ===== 打開 編輯 avatar 對話框 function
const openDialog = (item) => {
  dialogAvatar.value = true
}

// ===== 關閉 編輯 avatar 對話框 function
const closeDialog = () => {
  dialogAvatar.value = false // 關閉對話框
  fileAgent.value.deleteFileRecord() // 重設上傳的檔案
}

// 換頭貼送出中
const avatarSubmiting = ref(false)

// ==================== 前端表單驗證 ====================
// === 定義表單驗證規則
const schema = yup.object({
  account: yup
    .string()
    .required('缺少使用者帳號')
    .min(4, '帳號名稱最少 4 字')
    .max(20, '帳號名稱最多 20 字'),
  email: yup
    .string()
    .required('使用者信箱必填')
    // .test(自訂驗證名稱, 錯誤訊息, 驗證function)
    .test('isEmail', '信箱格式錯誤', (value) => {
      return validator.isEmail(value)
    }),
  // password: yup
  //   .string(),
  name: yup
    .string(),
  phone: yup
    .string(),
  address: yup
    .string()
})
// === 先 useForm -> 表單驗證方式綁定 schema
const { handleSubmit, isSubmitting } = useForm({ // handleSubmit 表單送出時的處理函式；isSubmitting 是否正在送出；resetForm 重置表單
  validationSchema: schema,
  // --- 初始值設定
  initialValues: {
    account: '',
    email: '',
    // password: '',
    name: '',
    phone: '',
    address: ''
  }
})
// === 再 useField -> 建立表單欄位
// 讓表單欄位綁定到 schema 的規則
const account = useField('account')
const email = useField('email')
// const password = useField('password')
const name = useField('name')
const phone = useField('phone')
const address = useField('address')

// 一開始就把 user 的資料放進表單
account.value.value = user.account
email.value.value = user.email
// password.value.value = user.password
name.value.value = user.name
phone.value.value = user.phone
address.value.value = user.address

// ====================================================

// ===== 取消編輯會員資料
const cancel = () => {
  // 重置表單成原本 pinia 的值
  account.value.value = user.account
  email.value.value = user.email
  // password.value.value = user.password
  name.value.value = user.name
  phone.value.value = user.phone
  address.value.value = user.address
  isEditing.value = false
}

// ===== 送出會員資料
const submit = handleSubmit(async (values) => {
  try {
    await apiAuth.patch('/users/self', values) // values 是表單的資料
    console.log(values)

    // 更新 user store 的資料
    user.getProfile()

    createSnackbar({
      text: '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'back',
        location: 'center'
      }
    })
    isEditing.value = false
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'secondary',
        location: 'center'
      }
    })
  }
})

// ===== VueFileAgent 上傳檔案寫法
const fileRecords = ref([])
const rawFileRecords = ref([])

// ===== 編輯大頭貼
const editAvatar = async () => {
  // 防止重複送出
  avatarSubmiting.value = true

  // 如果 圖片上傳有錯誤，就不送出  // 沒上傳圖片就沒有 value[0]，value[0] 是 undefined，undefined 沒有 .error 所以要用 ?. 避免錯誤
  if (fileRecords.value[0]?.error) return
  try {
    const fd = new FormData()

    // === 如果有選擇圖片，就放進 FormData
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    await apiAuth.patch('/users/avatar', fd)

    // 更新 user store 的 avatar
    user.getProfile()

    createSnackbar({
      text: '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'back',
        location: 'bottom'
      }
    })
    closeDialog()
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
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
  // 防止重複送出
  avatarSubmiting.value = false
}

</script>
  <!-- ------------------------------------------------------------------------ -->
  <style lang="scss" scoped>
  </style>
