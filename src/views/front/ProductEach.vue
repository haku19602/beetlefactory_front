<template>
<div style="height: 100%;" class="bg-back">
  <VContainer class="pt-12">
    <VRow>
      <!-- ===== 商品圖 -->
      <VCol cols="12" lg="6">
        <VImg :src="product.image" rounded="xl" max-width="700px"></VImg>
      </VCol>
      <!-- ===== 商品名稱 -->
      <VCol cols="12" lg="6">
        <h2>{{ product.name }}</h2>
        <!-- ===== 商品價格 -->
        <p>NT. {{ product.price }}</p>
        <!-- ===== 商品描述，white-space: pre; 保留換行 -->
        <p style="white-space: pre;">{{ product.description }}</p>
      </VCol>
    </VRow>
  </VContainer>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
// import { useSnackbar } from 'vuetify-use-dialog'
// import { useForm, useField } from 'vee-validate'
// import * as yup from 'yup'
// import { useUserStore } from '@/store/user'

const route = useRoute()
// const router = useRouter()
const { api, apiAuth } = useApi()
// const createSnackbar = useSnackbar()
// const user = useUserStore()

// ===== 商品要接收的資料預設值
// 建議要打預設值，不然會有可能出現 undefined 的情況
const product = ref({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  category: '',
  stock: 0
})

// const schema = yup.object({
//   quantity: yup.number().typeError('缺少數量').required('缺少數量').min(1, '數量最小為 1')
// })
// const { isSubmitting, handleSubmit } = useForm({
//   validationSchema: schema,
//   initialValues: {
//     quantity: 1
//   }
// })
// const quantity = useField('quantity')

// const submit = handleSubmit(async (values) => {
//   if (!user.isLogin) {
//     router.push('/login')
//     return
//   }
//   try {
//     const { data } = await apiAuth.patch('/users/cart', {
//       product: product.value._id,
//       quantity: values.quantity
//     })
//     user.cart = data.result
//     createSnackbar({
//       text: '新增成功',
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'green',
//         location: 'bottom'
//       }
//     })
//   } catch (error) {
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

// ===== 元件被掛到 DOM 時，才會發請求去後端要資料
onMounted(async () => {
  try {
    // === 對後端要商品資料
    const { data } = await api.get('/products/' + route.params.id) // data 是 axios 的 response 物件
    // === 把要到的資料放進 products 陣列
    product.value._id = data.result._id
    product.value.name = data.result.name
    product.value.price = data.result.price
    product.value.description = data.result.description
    product.value.image = data.result.image
    product.value.sell = data.result.sell
    product.value.category = data.result.category
    product.value.stock = data.result.stock
    // === 更改網頁標題
    document.title = `甲蟲工廠 | ${product.value.name}`
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
    router.push('/')
  }
})
</script>

<style lang="scss" scoped>
</style>
