<template>
  <!-- ================ 商品卡片元件 -->
  <VCard flat="0" rounded="md" class="product-card" color="back">
    <!-- === 商品圖片 -->
    <RouterLink :to="'/products/' + _id">
      <!-- aspect-ratio="1" 寬度是高度的 1倍 -->
      <VImg :src="image" cover aspect-ratio="1">
        <VOverlay :model-value="stock === 0" contained persistent class="align-center justify-center text-center" opacity="0.5">
          <h2 class="text-back sold-out pa-5">SOLD<br>OUT</h2>
        </VOverlay>
      </VImg>
    </RouterLink>
    <!-- === 商品名稱、分類 -->
    <VCardText class="d-flex justify-space-between pb-1">
      {{ name }}<VChip density="comfortable" variant="outlined" color="primary">{{ category }}</VChip>
    </VCardText>
    <!-- === 商品價格 -->
    <VCardSubtitle>NT. {{ price }}</VCardSubtitle>
    <!-- === 分隔線----------------------- -->
    <v-divider class="mx-3 mt-3"></v-divider>
    <!-- === 加入購物車、收藏 -->
    <VCardActions>
      <VBtn prepend-icon="mdi-cart" color="primary" rounded @click="addCart" :disabled="stock <= 0">加入購物車</VBtn>
      <v-spacer></v-spacer>
      <VBtn v-if="isLike" icon="mdi-heart" color="secondary" @click="addLike"></VBtn>
      <VBtn v-else icon="mdi-heart-outline" color="secondary" @click="addLike"></VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup>
import { computed } from 'vue'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const router = useRouter()

// ===== 定義商品卡片元件要接收的資料
const props = defineProps(['_id', 'category', 'description', 'image', 'name', 'price', 'sell', 'stock'])

// ===== 計算是否已收藏 true/false
const isLike = computed(() => {
  return user.likes.includes(props._id)
})

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
        height: '80px'
      }
    })
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 1500,
        color: 'secondary',
        location: 'center',
        height: '80px'
      }
    })
  }
}

// ===== 加入收藏 function
const addLike = async () => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    await apiAuth.patch('/users/likes', {
      product: props._id
    })

    // 更新 user store 中「收藏商品陣列」
    const idx = user.likes.findIndex(item => item === props._id)
    if (idx > -1) {
      user.likes.splice(idx, 1)
    } else {
      user.likes.push(props._id)
    }

    createSnackbar({
      text: '已加入收藏！',
      showCloseButton: false,
      snackbarProps: {
        timeout: 1500,
        color: 'primary',
        location: 'center',
        height: '80px'
      }
    })
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 1500,
        color: 'secondary',
        location: 'center',
        height: '80px'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.sold-out{
  border: 2px solid;
  border-radius: 15px;
}
</style>
