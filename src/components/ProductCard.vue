<template>
  <VCard elevation="0" rounded="xl" class="product-card">
    <!-- === 商品圖片 -->
    <RouterLink :to="'/products/' + _id">
      <!-- aspect-ratio="1" 寬度是高度的 1倍 -->
      <VImg :src="image" cover aspect-ratio="1"></VImg>
    </RouterLink>
    <!-- === 商品名稱、分類 -->
    <VCardText class="d-flex justify-space-between pb-1">
      {{ name }}
      <VChip density="comfortable">{{ category }}</VChip>
    </VCardText>
    <!-- === 商品價格 -->
    <VCardSubtitle>NT.{{ price }}</VCardSubtitle>
    <!-- === 分隔線----------------------- -->
    <v-divider class="mx-3 mt-3"></v-divider>
    <!-- === 加入購物車、收藏 -->
    <VCardActions>
      <VBtn prepend-icon="mdi-cart" color="primary" rounded @click="addCart">加入購物車</VBtn>
      <v-spacer></v-spacer>
      <VBtn icon="mdi-heart-outline" color="secondary" @click="addLike"></VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup>
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const router = useRouter()

const props = defineProps(['_id', 'category', 'description', 'image', 'name', 'price', 'sell', 'stock'])

// ===== 加入購物車 function
const addCart = async () => {
  // 如果沒有登入，就導向登入頁面
  if (!user.isLogin) { // 這裡的 user 是從 pinia 取得的
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product: props._id,
      quantity: 1
    })
    // 把 user store 中「購物車商品總數」，更新為後端回應的 data.result
    user.cart = data.result // 成功時後端回應的 data.result 是購物車商品總數
    createSnackbar({
      text: '已加入購物車！',
      showCloseButton: false,
      snackbarProps: {
        timeout: 1500,
        color: 'primary',
        location: 'center',
        height: '100px'
      }
    })
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'secomdary',
        location: 'center'
      }
    })
  }
}
</script>
