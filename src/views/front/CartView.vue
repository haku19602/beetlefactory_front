<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow class="justify-center">
        <!-- ==== 標題步驟 -->
        <VCol cols="12" class="text-center mt-8">
          <VChip class="vchip-space" variant="outlined" size="large" color="primary" append-icon="mdi-check-circle-outline"><b>購物車</b>&nbsp;>&nbsp;填寫運送資訊&nbsp;>&nbsp;購買完成 </VChip>
          <VDivider class="mx-3 my-5"></VDivider>
        </VCol>

        <!-- ==== 購物車清單 -->
        <VCol cols="12">
          <p v-if="user.cart === 0" class="text-center text-grey-darken-1">----- 購物車沒有商品 -----</p>
          <VRow v-for="item in cart" :key="item._id">
            <!-- === 圖片 -->
            <VCol cols="6" lg="3">
              <!-- aspect-ratio="1"，寬度是高度的 1倍，不同寬高 img 都以方形佔位 -> 清單等高 -->
              <VImg :src="item.product.image" aspect-ratio="1"></VImg>
            </VCol>
            <!-- === 商品名稱、價格、數量、小計 -->
            <VCol cols="6" lg="9" class="d-flex flex-column flex-lg-row">
              <VCol lg="4">
                <h3>{{ item.product.name }}</h3>
                <p class="text-grey-darken-1">NT. {{ item.product.price }}</p>
                <VChip density="comfortable" class="mt-2" variant="outlined" color="primary">{{ item.product.category }}</VChip>
              </VCol>
              <VCol>
                <p>
                  數量：
                  <VBtn icon="mdi-minus" variant="text" density="compact" color="primary" class="mb-1" @click="editCart(item.product._id, -1)"></VBtn>
                  {{ item.quantity }}
                  <VBtn icon="mdi-plus" variant="text" density="compact" color="primary" class="mb-1" @click="editCart(item.product._id, 1)"></VBtn>
                </p>
                <p v-if="item.product.stock < 5" class="text-secondary">最後 {{ item.product.stock }} 組！</p>
              </VCol>
              <VCol>
                <p>小計：NT. {{ item.product.price * item.quantity }}</p>
              </VCol>
              <VCol class="d-flex justify-lg-space-around" lg="2">
                <VBtn icon="mdi-heart-outline" size="small" color="secondary" variant="outlined" @click="addLike"></VBtn>
                <VBtn icon="mdi-delete" size="small" color="secondary" @click="editCart(item.product._id, item.quantity * -1)"></VBtn>
              </VCol>
            </VCol>

            <VDivider class="mx-3 my-3"></VDivider>
          </VRow>
        </VCol>

        <!-- ==== 結帳按鈕 -->
        <VCol cols="12" class="text-center mb-12">
          <VBtn color="primary" size="large" :disabled="user.cart === 0">結帳</VBtn>
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

// const total = computed(() => {
//   return cart.value.reduce((total, current) => {
//     return total + current.quantity * current.product.price
//   }, 0)
// })

// const canCheckout = computed(() => {
//   return cart.value.length > 0 && !cart.value.some(item => !item.product.sell)
// })

// ===== 購物車改值(增減數量、刪除)
const editCart = async (product, quantity) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    // === 發請求去後端修改購物車資料
    const { data } = await apiAuth.patch('/users/cart', {
      product,
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

// const isSubmitting = ref(false)
// const checkout = async () => {
//   isSubmitting.value = true
//   try {
//     await apiAuth.post('/orders')
//     user.cart = 0
//     router.push('/orders')
//     createSnackbar({
//       text: '結帳成功',
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
//   isSubmitting.value = false
// }

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
