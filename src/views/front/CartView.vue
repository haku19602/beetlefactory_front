<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow class="justify-center">
        <!-- 標題步驟 -->
        <VCol cols="12" class="text-center mt-8">
          <VChip class="vchip-space" variant="outlined" size="large" color="primary" append-icon="mdi-check-circle-outline"><b>購物車</b>&nbsp;>&nbsp;填寫運送資訊&nbsp;>&nbsp;購買完成 </VChip>
          <VDivider class="mx-3 my-5"></VDivider>
        </VCol>

        <!-- 購物車清單 -->
        <VCol cols="11">
          <VRow v-for="item in cart" :key="item._id">
            <VCol cols="3">
              <VImg :src="item.product.image" aspect-ratio="1"></VImg>
            </VCol>
            <VCol cols="7">
              <VCardTitle>{{ item.product.name }}</VCardTitle>
              <VCardSubtitle>NT. {{ item.product.price }}</VCardSubtitle>
              <VCardText>數量：{{ item.quantity }}</VCardText>
            </VCol>
            <VCol cols="2" class="d-flex justify-center align-center">
              <VBtn icon color="secondary" @click="removeCart(item.product._id)">
                <VIcon>mdi-delete</VIcon>
              </VBtn>
            </VCol>
            <VDivider class="mx-3 my-3"></VDivider>
          </VRow>
        </VCol>

        <!-- 結帳按鈕 -->
        <VCol cols="12" class="text-center mb-12">
          <VBtn color="primary" size="large">結帳</VBtn>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
<!-- ------------------------------------------------------------------ -->

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
// import { useUserStore } from '@/store/user'
// import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
// const user = useUserStore()
// const router = useRouter()

// ===== 購物車資料陣列
const cart = ref([])

// const headers = [
//   { title: '商品名稱', key: 'product.name' },
//   { title: '單價', key: 'product.price' },
//   { title: '數量', key: 'quantity' },
//   { title: '總價', key: 'total', value: item => item.product.price * item.quantity },
//   { title: '操作', key: 'action' }
// ]

// const total = computed(() => {
//   return cart.value.reduce((total, current) => {
//     return total + current.quantity * current.product.price
//   }, 0)
// })

// const canCheckout = computed(() => {
//   return cart.value.length > 0 && !cart.value.some(item => !item.product.sell)
// })

// const addCart = async (product, quantity) => {
//   if (!user.isLogin) {
//     router.push('/login')
//     return
//   }
//   try {
//     const { data } = await apiAuth.patch('/users/cart', {
//       product,
//       quantity
//     })
//     user.cart = data.result
//     createSnackbar({
//       text: '修改成功',
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'green',
//         location: 'bottom'
//       }
//     })
//     const idx = cart.value.findIndex(item => item.product._id === product)
//     cart.value[idx].quantity += quantity
//     if (cart.value[idx].quantity <= 0) {
//       cart.value.splice(idx, 1)
//     }
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
// }

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
