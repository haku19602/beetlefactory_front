<template>
  <VContainer>
    <VRow>
      <VCol cols="12">

      </VCol>

      <VCol cols="12">

      </VCol>
    </VRow>
  </VContainer>
</template>
<!-- ------------------------------------------------------------------ -->

<script setup>
// import { ref, onMounted, computed } from 'vue'
// import { useApi } from '@/composables/axios'
// import { useSnackbar } from 'vuetify-use-dialog'
// import { useUserStore } from '@/store/user'
// import { useRouter } from 'vue-router'

// const { apiAuth } = useApi()
// const createSnackbar = useSnackbar()
// const user = useUserStore()
// const router = useRouter()

// const cart = ref([])
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

// onMounted(async () => {
//   try {
//     const { data } = await apiAuth.get('/users/cart')
//     cart.value.push(...data.result)
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
</script>
<!-- ------------------------------------------------------------------ -->

<style lang="scss" scoped>
</style>
