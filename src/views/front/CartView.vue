<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow class="justify-center">
        <!-- ===== 標題步驟！！！ -->
        <VCol cols="12" md="11" class="text-center mt-8">
          <VChip class="vchip-space text-body-2 text-md-body-1" variant="outlined" size="large" color="primary" append-icon="mdi-check-circle-outline">購物車&nbsp;>&nbsp;填寫運送資訊&nbsp;>&nbsp;送出訂單&nbsp;>&nbsp;付款</VChip>
          <VDivider class="mx-3 my-5"></VDivider>
        </VCol>

        <!-- ===== 購物車清單！！！ -->
        <VCol cols="12" md="11">
          <p v-if="user.cart === 0" class="text-center text-grey-darken-1">----- 購物車沒有商品 -----</p>
          <!-- === 每項清單 v-for -->
          <VRow v-for="item in cart" :key="item._id">
            <!-- --- 圖片 -->
            <VCol cols="6" lg="3">
              <RouterLink :to="'/products/' + item.product._id">
                <!-- aspect-ratio="1"，寬度是高度的 1倍，不同寬高 img 都以方形佔位 -> 清單等高 -->
                <VImg :src="item.product.image" aspect-ratio="1"></VImg>
              </RouterLink>
            </VCol>
            <!-- --- 商品名稱、價格、數量、小計 -->
            <VCol cols="6" lg="9" class="d-flex flex-column flex-lg-row">
              <VCol lg="4">
                <!-- 上架或有庫存的顯示 -->
                <div v-if="item.product.sell && item.product.stock > 0">
                  <h3>{{ item.product.name }}</h3>
                  <p class="text-grey-darken-1">NT. {{ item.product.price }}</p>
                </div>
                <!-- 下架或沒庫存的顯示 -->
                <div v-else>
                  <h3 class="text-decoration-line-through">{{ item.product.name }}</h3>
                  <p class="text-secondary text-subtitle-2">商品已下架 或 暫時無庫存</p>
                  <p class="text-grey-darken-1">NT. {{ item.product.price }}</p>
                </div>
                <VChip density="comfortable" class="mt-2" variant="outlined" color="primary">{{ item.product.category }}</VChip>
              </VCol>
              <VCol>
                <p :class="item.product.sell && item.product.stock > 0 ? [] : ['text-grey']">
                  數量：
                  <VBtn icon="mdi-minus" variant="text" density="compact" color="primary" class="mb-1" :disabled="!item.product.sell || item.product.stock <= 0" @click="editCart(item.product._id, -1)"></VBtn>
                  {{ item.quantity }}
                  <VBtn icon="mdi-plus" variant="text" density="compact" color="primary" class="mb-1" :disabled="!item.product.sell || item.product.stock <= 0" @click="editCart(item.product._id, 1)"></VBtn>
                </p>
                <p v-if="item.product.stock <= 5 && item.product.stock > 0" class="text-secondary text-subtitle-2">最後 {{ item.product.stock }} 組！</p>
              </VCol>
              <VCol>
                <p :class="item.product.sell && item.product.stock > 0 ? [] : ['text-grey']">小計：NT. <b>{{ item.product.price * item.quantity }}</b></p>
              </VCol>
              <VCol class="d-flex" lg="2">
                <VBtn icon="mdi-heart" v-if="isLike(item.product._id)" size="small" color="secondary" variant="outlined" class="me-3" @click="addLike(item.product._id)"></VBtn>
                <VBtn icon="mdi-heart-outline" v-else size="small" color="secondary" variant="outlined" class="me-3" @click="addLike(item.product._id)"></VBtn>
                <VBtn icon="mdi-delete" size="small" color="secondary" @click="editCart(item.product._id, item.quantity * -1)"></VBtn>
              </VCol>
            </VCol>
            <VDivider class="mx-3 my-3"></VDivider>
          </VRow>
        </VCol>

        <!-- ===== 總計！！！ -->
        <VCol cols="12" md="11" class="text-end pe-10">
          <p>共 <b>{{ user.cart }}</b> 件商品</p>
          <p>總計：NT. <b class="text-h5 font-weight-bold">{{ total }}</b></p>
          <p class="text-body-2 text-grey-darken-1">(運費另計)</p>
        </VCol>

        <!-- ===== 填寫運送資訊按鈕！！！ -->
        <VCol cols="12" md="11" class="text-end pe-10 mb-5">
          <VBtn color="primary" size="large" rounded append-icon="mdi-arrow-down-circle" @click="openForm = !openForm">填寫運送資訊</VBtn>
        </VCol>

        <!-- ===== 運送資訊表單！！！ -->
        <VCol cols="12" md="11" class="text-end mb-16 pe-10">
          <VForm v-show="openForm" :disabled="isSubmitting" @submit.prevent="checkout">
            <VRow>
              <VCol cols="12" md="4">
                <VTextField prepend-icon="mdi-account-box-outline" label="收件人姓名" placeholder="王X明" hint="請填寫真實姓名以利收件" variant="outlined" density="compact"
                  v-model="name.value.value" :error-messages="name.errorMessage.value"></VTextField>
              </VCol>
              <VCol cols="12" md="4">
                <VTextField prepend-icon="mdi-phone-outline" label="收件人電話" placeholder="0912345678" variant="outlined" density="compact"
                  v-model="phone.value.value" :error-messages="phone.errorMessage.value"></VTextField>
              </VCol>
              <VCol cols="12" md="4">
                <VSelect prepend-icon="mdi-package-variant-closed-check" label="運送方式" variant="outlined" density="compact" :items="categories"
                  v-model="delivery.value.value" :error-messages="delivery.errorMessage.value"></VSelect>
              </VCol>
              <VCol cols="12" md="12">
                <VTextField prepend-icon="mdi-map-marker-outline" label="收件地址" placeholder="請填寫宅配地址 或 7-11 門市，面交請填寫「面交」" variant="outlined" density="compact"
                  v-model="address.value.value" :error-messages="address.errorMessage.value"></VTextField>
              </VCol>
              <VCol cols="12">
                <VTextarea prepend-icon="mdi-text" label="訂單備註" variant="outlined" density="compact" clearable auto-grow
                  v-model="note.value.value" :error-messages="note.errorMessage.value"></VTextarea>
              </VCol>
                <!-- === 總計＋運費 -->
              <VCol cols="12">
                <p>總計：NT. <b class="text-h5 font-weight-bold">{{ total }}</b></p>
                <p v-if="delivery.value.value === '黑貓'">運費：NT. <b class="text-h6 font-weight-bold">110</b></p>
                <p v-if="delivery.value.value === '7-11 交貨便'">運費：NT. <b class="text-h6 font-weight-bold">70</b></p>
                <p v-if="delivery.value.value === '面交'">運費：NT. <b class="text-h6 font-weight-bold">0</b></p>
              </VCol>
                <!-- === 結帳按鈕，相當於送出運送資訊表單，相當於 creat 訂單 -->
              <VCol cols="12">
                <VBtn type="submit" color="primary" size="large" rounded append-icon="mdi-arrow-right-circle" :disabled="!canCheckout" :loading="isSubmitting">送出訂單</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCol>

      </VRow>
    </VContainer>
    <!-- <VFooter></VFooter> -->
  </div>
</template>
<!-- ------------------------------------------------------------------ -->

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()
const router = useRouter()

// ===== 購物車資料陣列
const cart = ref([])

// ===== 是否收藏
const isLike = (productId) => {
  return user.likes.includes(productId)
}

// ===== 計算總金額
const total = computed(() => {
  // 陣列.reduce((前次跑到的累加值, 目前跑到陣列項目的值) => { return total + current }, 初始值)
  return cart.value.reduce((total, current) => {
    return total + current.quantity * current.product.price
  }, 0)
})

// ===== 運送資訊表單開關
const openForm = ref(false)

// ===== 運送方式分類
const categories = ['黑貓', '7-11 交貨便', '面交']

// ===== 判斷是否可以結帳，用來綁定結帳按鈕是否可以點擊
const canCheckout = computed(() => {
  // 購物車有商品，且購物車內商品都是上架的，且購物車內商品都有庫存
  return cart.value.length > 0 && !cart.value.some(item => !item.product.sell) && !cart.value.some(item => item.product.stock <= 0)
})

// ===== 購物車改值(增減數量、刪除)
const editCart = async (product, quantity) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    // === 發請求去後端修改購物車資料
    // data 是後端回應(result)的購物車商品總數，前端要更新 user store 中「購物車商品總數」，如果沒有要把資訊放進 user store，就不用接收後端回應的 data
    const { data } = await apiAuth.patch('/users/cart', {
      product, // 不用加 : product: product，因為 key 跟 value 一樣
      quantity // 傳進後端的數量，後端會用原本的數量加上這個數量
    })
    // 把 user store 中「購物車商品總數」，更新為後端回應的 data.result
    user.cart = data.result // 成功時後端回應的 data.result 是購物車商品總數

    // === 修改一開始跟後端要的購物車資料陣列 cart[]
    // -- 找到要修改的商品在購物車資料陣列的索引
    const idx = cart.value.findIndex(item => item.product._id === product)
    // -- 修改購物車資料陣列的數量
    cart.value[idx].quantity += quantity
    // -- 如果數量小於等於 0，就從陣列刪除這個商品
    if (cart.value[idx].quantity <= 0) {
      cart.value.splice(idx, 1)
    }
    // -- 如果數量大於商品庫存，就把數量改成商品庫存 -> 這裡不需要了，因為後端如果大於庫存會自動改成庫存並丟錯誤訊息
    // if (cart.value[idx].quantity > cart.value[idx].product.stock) {
    //   cart.value[idx].quantity = cart.value[idx].product.stock
    //   user.cart = cart.value[idx].product.stock
    // }
    createSnackbar({
      text: '修改成功',
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
}
// ===== 加入收藏 function
const addLike = async (product) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    await apiAuth.patch('/users/likes', {
      product // 不用加 : product: product，因為 key 跟 value 一樣
    })

    // 更新 user store 中「收藏商品陣列」
    const idx = user.likes.findIndex(item => item === product)
    if (idx > -1) {
      user.likes.splice(idx, 1)
    } else {
      user.likes.push(product)
    }

    createSnackbar({
      text: isLike(product) ? '已加入收藏！' : '已取消收藏！',
      showCloseButton: false,
      snackbarProps: {
        timeout: 1000,
        color: 'back',
        location: 'center'
        // height: '80px'
      }
    })
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 1000,
        color: 'secondary',
        location: 'center'
        // height: '80px'
      }
    })
  }
}

// ==================== 前端表單驗證 ====================
// 1.=== 定義表單驗證規則
const schema = yup.object({
  name: yup
    .string()
    .required('收件人姓名 必填'),
  phone: yup
    .string()
    .required('收件人電話 必填')
    .min(10, '手機號碼格式錯誤')
    .max(10, '手機號碼格式錯誤'),
  delivery: yup
    .string()
    .required('運送方式 必填')
    .test('isCategory', '運送方式錯誤', value => categories.includes(value)),
  address: yup
    .string()
    .required('收件地址 必填'),
  note: yup
    .string()
})
// 2.=== 先 useForm -> 表單驗證方式綁定 schema
// handleSubmit 表單送出時的處理函式；isSubmitting 是否正在送出
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    // --- 初始值設定
    name: '',
    phone: '',
    delivery: '',
    address: '',
    note: ''
  }
})
// 3.=== 再 useField -> 綁定表單欄位 -> 表單 DOM 使用 v-model 綁定自訂義驗證 schema 的 xx 欄位驗證
// 要跟上面 schema 的名稱對到，例如 'name'
const name = useField('name')
const phone = useField('phone')
const delivery = useField('delivery')
const address = useField('address')
const note = useField('note')

name.value.value = user.name
phone.value.value = user.phone
address.value.value = user.address

// ====================================================

// ===== 結帳 function
const checkout = handleSubmit(async (values) => {
  try {
    await apiAuth.post('/orders', {
      // 要送出的東西，這裡的 key 要跟後端接收的欄位名稱一樣
      name: values.name,
      phone: values.phone,
      delivery: values.delivery,
      address: values.address,
      note: values.note
    })
    // 清空前端 user store 中的購物車商品總數
    user.cart = 0
    // 跳轉到訂單頁面
    router.push('/myorders')
    createSnackbar({
      text: '訂單送出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'back',
        location: 'bottom'
      }
    })
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'secondary',
        location: 'bottom'
      }
    })
    // 重新整理頁面，讓使用者商品資訊更新
    setTimeout(() => {
      router.go(0)
    }, 3000)
  }
})

// ===== 跟後端要購物車資料
onMounted(async () => {
  try {
    // === 發請求去後端要購物車資料
    const { data } = await apiAuth.get('/users/cart')
    // === 後端購物車資料放進元件購物車資料陣列
    // 後端回應 -> 使用者購物車各商品陣列，陣列內容是物件，物件內容(key)有商品id(product)帶出的商品資料、數量(quantity)
    cart.value.push(...data.result)
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
</script>
<!-- ------------------------------------------------------------------ -->

<style lang="scss" scoped>
.vchip-space ::v-deep .v-chip__content {
  letter-spacing: 2px;
}
</style>
