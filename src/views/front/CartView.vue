<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow class="justify-center">
        <!-- ===== 標題步驟！！！ -->
        <VCol cols="12" md="10" class="text-center mt-8">
          <VChip class="vchip-space" variant="outlined" size="large" color="primary" append-icon="mdi-check-circle-outline"><b>購物車</b>&nbsp;>&nbsp;填寫運送資訊&nbsp;>&nbsp;購買完成 </VChip>
          <VDivider class="mx-3 my-5"></VDivider>
        </VCol>

        <!-- ===== 購物車清單！！！ -->
        <VCol cols="12" md="10">
          <p v-if="user.cart === 0" class="text-center text-grey-darken-1">----- 購物車沒有商品 -----</p>
          <VRow v-for="item in cart" :key="item._id">
            <!-- === 圖片 -->
            <VCol cols="6" lg="3">
              <RouterLink :to="'/products/' + item.product._id">
                <!-- aspect-ratio="1"，寬度是高度的 1倍，不同寬高 img 都以方形佔位 -> 清單等高 -->
                <VImg :src="item.product.image" aspect-ratio="1"></VImg>
              </RouterLink>
            </VCol>
            <!-- === 商品名稱、價格、數量、小計 -->
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
        <VCol cols="12" md="10" class="text-end pe-10">
          <p>共 <b>{{ user.cart }}</b> 件商品</p>
          <p>總計：NT. <b class="text-h5 font-weight-bold">{{ total }}</b></p>
        </VCol>
        <!-- ===== 填寫運送資訊按鈕！！！ -->
        <VCol cols="12" md="10" class="text-end pe-10">
          <VBtn color="primary" size="large" rounded append-icon="mdi-arrow-down-circle" :disabled="!canCheckout" @click="openForm = !openForm">填寫運送資訊</VBtn>
        </VCol>
        <!-- ===== 運送資訊表單 -->
        <VCol cols="12" md="10" class="text-end mb-16 pe-10">
          <VForm v-show="openForm">
            <VSelect label="運送方式" variant="outlined" density="compact" :items="categories"></VSelect>
            <VTextField v-model="name" label="收件人姓名" variant="outlined" density="compact" class="pb-3" ></VTextField>
            <VTextField v-model="phone" label="收件人電話" variant="outlined" density="compact" class="pb-3"></VTextField>
            <VTextField v-model="address" label="收件地址" variant="outlined" density="compact" class="pb-3"></VTextField>
            <!-- === 結帳按鈕，相當於送出運送資訊表單 -->
            <VBtn color="primary" size="large" rounded append-icon="mdi-arrow-right-circle" :disabled="!canCheckout" @click="checkout">結帳</VBtn>
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

// ===== 判斷結帳是否正在送出中，用來綁定結帳按鈕是否可以點擊，避免重複送出
const isSubmitting = ref(false)

// ===== 結帳 function
const checkout = async () => {
  isSubmitting.value = true

  try {
    await apiAuth.post('/orders', {
      // 要送出的東西，這裡的 key 要跟後端接收的欄位名稱一樣
    })
    user.cart = 0
    router.push('/orders')
    createSnackbar({
      text: '結帳成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
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
        color: 'red',
        location: 'bottom'
      }
    })
  }

  isSubmitting.value = false
}

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
