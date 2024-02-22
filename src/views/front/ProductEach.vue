<template>
  <!-- ================ 商品詳細頁 -->
  <div style="height: 100%;" class="bg-back">
    <VContainer class="pt-12">
      <VRow class="justify-center">
        <!-- ===== 商品圖 -->
        <VCol cols="10" lg="5">
          <VImg :src="product.image" rounded="xl" max-width="500px" class="mx-auto">
            <!-- sold out -->
            <!-- <VOverlay :model-value="true" v-if="product.stock === 0" contained class="align-center justify-center text-center" opacity="0.5">
              <h1 class="text-back sold-out pa-5">SOLD<br>OUT</h1>
            </VOverlay> -->
          </VImg>
        </VCol>
        <!-- ===== 文字說明 -->
        <VCol cols="10" lg="5" class="pt-16 px-10">
            <!-- === 商品名稱 -->
            <h2>{{ product.name }}</h2>
            <!-- === 商品價格、商品分類 -->
            <h3 class="d-flex justify-space-between text-primary">
              NT. {{ product.price }}<VChip variant="outlined" color="primary">{{ product.category }}</VChip>
            </h3>
            <!-- === 加購物車 -->
            <VForm :disabled="isSubmitting" @submit.prevent="submit" class="d-flex mt-5">
              <VTextField type="number" placeholder="數量" min="0" :max="product.stock"
                color="primary" variant="outlined" density="comfortable"
                :disabled="product.stock === 0" v-model.number="quantity.value.value" :error-messages="quantity.errorMessage.value"
                :hint="product.stockText" persistent-hint class="hint-color"></VTextField>
              <VBtn v-if="product.stock > 0" type="submit" prepend-icon="mdi-cart" color="primary" width="50%" height="48px" class="ms-3" :loading="isSubmitting">加入購物車</VBtn>
              <VBtn v-if="product.stock === 0" prepend-icon="mdi-cart" color="grey-darken-1" width="50%" height="48px" class="ms-3" :disabled="product.stock === 0">已售完</VBtn>
            </VForm>
            <!-- === 加入收藏 -->
            <div class="text-end">
              <VBtn icon="mdi-heart-outline" color="secondary" variant="text" density="comfortable" @click="addLike" class="text-center"></VBtn>
            </div>
            <!-- === 商品描述，white-space: pre; 保留換行 -->
            <h4 class="text-primary">商品描述</h4>
            <VDivider class="my-2"></VDivider>
            <p style="white-space: pre;">{{ product.description }}</p>
            <!-- width="100%" height="50px" -->
        </VCol>
      </VRow>
    </VContainer>
    <!-- ===== 已下架 -->
    <!-- :model 綁定開關，這裡不需要控制開關，用 :model-value 綁定值固定是 "!product.sell" -->
    <VOverlay :model-value="!product.sell" persistent class="align-center justify-center text-center" opacity="0.5">
      <h1 class="text-back text-h2 font-weight-black mb-5">已下架</h1>
      <VBtn to="/" color="primary" size="x-large" elevation="15" rounded>回首頁</VBtn>
    </VOverlay>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
// 表單驗證
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const route = useRoute()
const router = useRouter()
const { api, apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()

// ===== 商品要接收的資料預設值
const product = ref({ // 建議要打預設值，不然會有可能出現 undefined 的情況
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  category: '',
  stock: 0,
  stockText: ''
})

// ==================== 前端表單驗證 ====================
// 1.=== 定義表單驗證規則
const schema = yup.object({
  quantity: yup.number().typeError('數量格式錯誤').required('缺少數量').min(1, '數量最小為 1') // 表單只有一個數量欄位
})
// 2.=== 先用 useForm 綁定表單使用自訂驗證 schema，並給予表單初始值
const { isSubmitting, handleSubmit } = useForm({
  // 表單驗證方式綁定上面定義的 schema
  validationSchema: schema,
  // 表單初始值
  initialValues: {
    quantity: 1
  }
})
// 3.=== 使用 useField 綁定表單欄位 -> 表單 DOM 使用 v-model 綁定使用自訂義驗證 schema 的 quantity 欄位驗證
const quantity = useField('quantity')
// ====================================================

// ===== 加入購物車 function
const submit = handleSubmit(async (values) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product: product.value._id,
      quantity: values.quantity // 傳進後端的數量，後端會用原本的數量加上這個數量
    })
    user.cart = data.result
    createSnackbar({
      text: '新增成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'primary',
        location: 'bottom'
      }
    })
  } catch (error) {
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
})

// ===== 發請求去後端要該商品資料
onMounted(async () => { // 元件被掛到 DOM 時，才會發請求
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
    if (data.result.stock <= 5 && data.result.stock > 0) {
      product.value.stockText = `最後 ${data.result.stock} 組！`
    }
    // === 更改網頁標題
    document.title = `甲蟲工廠 | ${product.value.name}`
  } catch (error) {
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
    // === 跳轉到商店頁
    router.push('/shop')
  }
})
</script>

<style lang="scss" scoped>
.sold-out{
  border: 2px solid;
  border-radius: 15px;
}
.hint-color ::v-deep .v-messages__message{
  color: #E16845;
  font-weight: bold;
  font-size: 0.9rem;
  margin-left: -7px;
}
</style>
