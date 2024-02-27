<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow class="justify-center pt-10">
        <!-- ===== 選擇項目！！！ -->
        <VCol cols="5" sm="4" md="3" lg="2">
          <VCard class="mx-auto " max-width="300" flat="0">
            <VList density="compact" class="bg-back">
                <VListItem v-for="(item, i) in items" :key="i" :to="item.to" :prepend-icon="item.icon" :title="item.text" color="primary" rounded="xl"></VListItem>
            </VList>
          </VCard>
        </VCol>

        <!-- ===== 喜歡清單！！！ -->
        <VCol cols="12" sm="8" md="9" lg="10">
          <p v-if="user.likes.length === 0" class="text-center text-grey-darken-1">----- 沒有收藏商品 -----</p>
          <VRow v-for="item in likes" :key="item.product._id" >
            <!-- === 圖片 -->
            <VCol cols="6" lg="3">
              <RouterLink :to="'/products/' + item.product._id">
                <!-- aspect-ratio="1"，寬度是高度的 1倍，不同寬高 img 都以方形佔位 -> 清單等高 -->
                <VImg :src="item.product.image" aspect-ratio="1"></VImg>
              </RouterLink>
            </VCol>
            <!-- === 商品資訊 -->
            <VCol cols="6" lg="9" class="d-flex flex-column flex-lg-row">
              <!-- --- 名稱 分類 -->
              <VCol lg="4">
                <h3>{{ item.product.name }}</h3>
                <VChip density="comfortable" class="mt-2" variant="outlined" color="primary">{{ item.product.category }}</VChip>
              </VCol>
              <!-- --- 價格 -->
              <VCol lg="4">
                <p class="text-grey-darken-1">NT. {{ item.product.price }}</p>
              </VCol>
              <!-- --- 加入購物車、移除收藏 -->
              <VCol lg="4">
                <VBtn icon="mdi-cart" size="small" color="primary" class="me-3" @click="addCart(item.product._id)"></VBtn>
                <VBtn icon="mdi-heart-remove" size="small" color="secondary" @click="removeLike(item.product._id)"></VBtn>
              </VCol>
            </VCol>

            <VDivider class="mx-3 my-3"></VDivider>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
<!-- -------------------------------------------------------------------------------- -->
<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()
const router = useRouter()

// ===== 喜歡清單陣列
const likes = ref([])

const items = [
  { to: '/mysetting', text: '會員設定', icon: 'mdi-cog' },
  { to: '/mylikes', text: '我的收藏', icon: 'mdi-heart' },
  { to: '/myorders', text: '我的訂單', icon: 'mdi-list-box' }
]

// ===== 加入購物車 function
const addCart = async (productId) => {
  // 如果沒有登入，就導向登入頁面
  if (!user.isLogin) { // 這裡的 user 是從 pinia 取得的
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product: productId,
      quantity: 1
    })
    // 把 user store 中「購物車商品總數」，更新為後端回應的 data.result
    user.cart = data.result // 成功時後端回應的 data.result 是購物車商品總數
    createSnackbar({
      text: '已加入購物車！',
      showCloseButton: false,
      snackbarProps: {
        timeout: 1500,
        color: 'back',
        location: 'center'
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
        location: 'center'
      }
    })
  }
}

// ===== 移除收藏 function
const removeLike = async (product) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    await apiAuth.patch('/users/likes', {
      product // 不用加 : product: product，因為 key 跟 value 一樣
    })

    // 修改一開始跟後端要的 likes 陣列（拿來呈現畫面的）
    const likesIdx = likes.value.findIndex(item => item.product._id === product)
    likes.value.splice(likesIdx, 1)

    // 更新 user store 中「收藏商品陣列」
    const idx = user.likes.findIndex(item => item === product)
    user.likes.splice(idx, 1)

    createSnackbar({
      text: '已取消收藏！',
      showCloseButton: false,
      snackbarProps: {
        timeout: 1000,
        color: 'back',
        location: 'center'
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
      }
    })
  }
}

// ===== 取得收藏清單
onMounted(async () => {
  try {
    // === 發請求去後端要收藏資料
    const { data } = await apiAuth.get('/users/likes')
    // === 後端收藏資料放進元件收藏資料陣列
    // 後端回應 -> 使用者收藏清單各商品陣列{product、_id}
    likes.value.push(...data.result)
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
<!-- -------------------------------------------------------------------------------- -->

<style lang="scss" scoped>
</style>
