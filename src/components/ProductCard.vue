<template>
  <VCard elevation="0" rounded="xl" class="product-card">
    <RouterLink :to="'/products/' + _id">
      <!-- aspect-ratio="1" 寬度是高度的 1倍 -->
      <VImg :src="image" cover aspect-ratio="1"></VImg>
    </RouterLink>
    <VCardText class="d-flex justify-space-between">
      {{ name }}
      <VChip density="comfortable">{{ category }}</VChip>
    </VCardText>
    <VCardSubtitle>NT.{{ price }}</VCardSubtitle>
    <v-divider class="mx-3 mt-3"></v-divider>
    <VCardActions>
      <VBtn prepend-icon="mdi-cart" color="primary" rounded size="small" @click="addCart">加入購物車</VBtn>
      <v-spacer></v-spacer>
      <VBtn icon="mdi-heart-outline" color="secondary" @click="addLike"></VBtn>
    </VCardActions>

  </VCard>
<!--
VCard.product-card
  VImg(:src="image" cover height="200")
  VCardTitle
    RouterLink.text-primary.text-decoration-none(:to="'/products/' + _id") {{ name }}
  VCardSubtitle ${{ price }}
  //- white-space: pre -> 顯示換行
  VCardText(style="white-space: pre;") {{ description }}
  VCardActions
    VBtn(color="primary" prepend-icon="mdi-cart" @click="addCart") 加入購物車
-->
</template>

<script setup>
// import { useApi } from '@/composables/axios'
// import { useUserStore } from '@/store/user'
// import { useSnackbar } from 'vuetify-use-dialog'
// import { useRouter } from 'vue-router'

// const { apiAuth } = useApi()
// const user = useUserStore()
// const createSnackbar = useSnackbar()
// const router = useRouter()

const props = defineProps(['_id', 'category', 'description', 'image', 'name', 'price', 'sell', 'stock'])

// const addCart = async () => {
//   if (!user.isLogin) {
//     router.push('/login')
//     return
//   }
//   try {
//     const { data } = await apiAuth.patch('/users/cart', {
//       product: props._id,
//       quantity: 1
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
// }
</script>
