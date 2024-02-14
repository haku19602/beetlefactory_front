<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VBtn prepend-icon="mdi-plus" color="primary" rounded @click="openDialog()">新增商品</VBtn>
      </VCol>
    </VRow>
  </VContainer>

  <!-- 新增或編輯商品 跳出的視窗 -->
  <VDialog v-model="dialog" persistent width="500px">
    <VForm>
      <VCard rounded="xl">
        <VCardTitle class="text-center mt-3 pb-0">{{ dialogId === '' ? '新增商品' : '編輯商品' }}</VCardTitle>

        <VCardText>
          <VTextField label="商品名稱" variant="outlined" density="compact" class="pb-3"
            v-model="name.value.value" :error-messages="name.errorMessage.value"></VTextField>
          <VTextField label="價格" variant="outlined" density="compact" type="number" min="0" class="pb-3"
            v-model="price.value.value" :error-messages="price.errorMessage.value"></VTextField>
          <VTextField label="商品數量" variant="outlined" density="compact" type="number" min="0" class="pb-3"
            v-model="stock.value.value" :error-messages="stock.errorMessage.value"></VTextField>
          <VSelect label="分類" variant="outlined" density="compact" :items="categories"
            v-model="category.value.value" :error-messages="category.errorMessage.value"></VSelect>
          <VCheckbox label="上架" density="compact"
            v-model="sell.value.value" :error-messages="sell.errorMessage.value"></VCheckbox>
          <VTextarea label="商品描述" variant="outlined" density="compact"
            v-model="description.value.value" :error-messages="description.errorMessage.value"></VTextarea>
          <VueFileAgent></VueFileAgent>
        </VCardText>

        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color="secondary" rounded>取消</VBtn>
          <VBtn color="primary" rounded>新增</VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </VDialog>
</template>
<!-- ------------------------------------------- -->
<script setup>
import { ref } from 'vue'
// 表單驗證套件
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
// import { useApi } from '@/composables/axios'
// import { useSnackbar } from 'vuetify-use-dialog'

// const { apiAuth } = useApi()
// const createSnackbar = useSnackbar()

// const fileAgent = ref(null)

// ===== 表單對話框的開啟狀態
const dialog = ref(false)

// ===== 判斷表單對話框為新增或編輯
// 表單對話框正在編輯的商品 ID，空的話代表是新增商品
const dialogId = ref('')

// ===== 商品分類
const categories = ['成蟲', '幼蟲', '標本']

// ===== 打開編輯對話框的函式
const openDialog = (item) => {
  if (item) {
    dialogId.value = item._id
    // name.value.value = item.name
    // price.value.value = item.price
    // description.value.value = item.description
    // category.value.value = item.category
    // sell.value.value = item.sell
  } else {
    dialogId.value = ''
  }
  dialog.value = true
}

// 關閉對話框
// const closeDialog = () => {
//   dialog.value = false
//   resetForm()
//   fileAgent.value.deleteFileRecord()
// }

// ==================== 前端表單驗證 ====================
// === 定義表單驗證規則
const schema = yup.object({
  name: yup
    .string()
    .required('缺少商品名稱'),
  price: yup
    .number()
    .typeError('價格格式錯誤')
    .required('缺少商品價格')
    .min(0, '商品價格不能小於 0'),
  stock: yup
    .number()
    .typeError('數量格式錯誤')
    .required('缺少商品數量')
    .min(0, '商品數量不能小於 0'),
  description: yup
    .string()
    .required('缺少商品描述'),
  category: yup
    .string()
    .required('缺少商品分類')
    .test('isCategory', '商品分類錯誤', value => categories.includes(value)),
  sell: yup
    .boolean()
})
// === 先 useForm -> 表單驗證方式綁定 schema
const { handleSubmit, isSubmitting, resetForm } = useForm({ // handleSubmit 表單送出時的處理函式；isSubmitting 是否正在送出；resetForm 重置表單
  validationSchema: schema,
  // --- 初始值設定
  initialValues: {
    name: '',
    price: 0,
    stock: 0,
    description: '',
    category: '',
    sell: false
  }
})
// === 再 useField -> 建立表單欄位
// 讓表單欄位綁定到 schema 的規則
const name = useField('name')
const price = useField('price')
const stock = useField('stock')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')
// ====================================================

// const fileRecords = ref([])
// const rawFileRecords = ref([])

// const submit = handleSubmit(async (values) => {
//   if (fileRecords.value[0]?.error) return
//   if (dialogId.value === '' && fileRecords.value.length === 0) return
//   try {
//     // 建立 FormData 物件
//     // 使用 fd.append(欄位, 值) 將資料放進去
//     const fd = new FormData()
//     for (const key in values) {
//       fd.append(key, values[key])
//     }

//     if (fileRecords.value.length > 0) {
//       fd.append('image', fileRecords.value[0].file)
//     }

//     if (dialogId.value === '') {
//       await apiAuth.post('/products', fd)
//     } else {
//       await apiAuth.patch('/products/' + dialogId.value, fd)
//     }

//     createSnackbar({
//       text: dialogId.value === '' ? '新增成功' : '編輯成功',
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'green',
//         location: 'bottom'
//       }
//     })
//     closeDialog()
//     tableApplySearch()
//   } catch (error) {
//     console.log(error)
//     const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
//     createSnackbar({
//       text,
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'red',
//         location: 'bottom'
//       }
//     })
//   }
// })

// // 表格每頁幾個
// const tableItemsPerPage = ref(10)
// // 表格排序
// const tableSortBy = ref([
//   { key: 'createdAt', order: 'desc' }
// ])
// // 表格頁碼
// const tablePage = ref(1)
// // 表格商品資料陣列
// const tableProducts = ref([])
// // 表格欄位設定
// const tableHeaders = [
//   { title: '圖片', align: 'center', sortable: false, key: 'image' },
//   { title: '名稱', align: 'center', sortable: true, key: 'name' },
//   { title: '價格', align: 'center', sortable: true, key: 'price' },
//   // { title: '說明', align: 'center', sortable: true, key: 'description' },
//   { title: '分類', align: 'center', sortable: true, key: 'category' },
//   { title: '上架', align: 'center', sortable: true, key: 'sell' },
//   { title: '編輯', align: 'center', sortable: false, key: 'edit' }
// ]
// // 表格載入狀態
// const tableLoading = ref(true)
// // 表格全部資料數
// const tableItemsLength = ref(0)
// // 表格搜尋文字
// const tableSearch = ref('')
// // 表格載入資料
// const tableLoadItems = async () => {
//   tableLoading.value = true
//   try {
//     const { data } = await apiAuth.get('/products/all', {
//       params: {
//         page: tablePage.value,
//         itemsPerPage: tableItemsPerPage.value,
//         sortBy: tableSortBy.value[0]?.key || 'createdAt',
//         sortOrder: tableSortBy.value[0]?.order === 'asc' ? 1 : -1,
//         search: tableSearch.value
//       }
//     })
//     tableProducts.value.splice(0, tableProducts.value.length, ...data.result.data)
//     tableItemsLength.value = data.result.total
//   } catch (error) {
//     console.log(error)
//     const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
//     createSnackbar({
//       text,
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'red',
//         location: 'bottom'
//       }
//     })
//   }
//   tableLoading.value = false
// }
// tableLoadItems()
// // 表格套用搜尋
// const tableApplySearch = () => {
//   tablePage.value = 1
//   tableLoadItems()
// }
</script>

<!-- ------------------------------------------- -->
<style lang="scss" scoped>
</style>
