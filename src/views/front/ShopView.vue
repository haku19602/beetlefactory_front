<template>
<div style="background: #F8F4EB; height: 100%;">
  <VContainer>
    <VRow>
      <VCol cols="12" class="pt-12">
        <h2 class="text-center text-primary">商品</h2>
      </VCol>

      <VCol cols="6" md="6" lg="4" v-for="product in products" :key="product._id">
        <!-- 商品卡片寫成元件傳入 -->
        <ProductCard v-bind="product"></ProductCard>
      </VCol>
    </VRow>
  </VContainer>
</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import ProductCard from '@/components/ProductCard.vue'
import gsap from 'gsap'

const { api } = useApi()
const createSnackbar = useSnackbar()

// ===== 商品陣列
const products = ref([])

// ===== 取得商品資料
onMounted(async () => { // 不用 onMounted 的話，就是在 created 的生命週期呼叫 api，那裡面就不能對 DOM 做處理
  try {
    // === 元件被掛到 DOM 時，才會發請求去後端要資料
    const { data } = await api.get('/products', {
      params: {
        itemsPerPage: -1 // 沒有分頁 - 回全部??????????
      }
    })
    // === 把要到的資料 push 進 products 陣列
    products.value.push(...data.result.data)
    // === 等待 vue 重新渲染頁面
    await nextTick() // data 更新後不會立即渲染 DOM
    // === 商品卡片出場動畫
    gsap.from('.product-card', {
      y: 80,
      // opacity: 0,
      duration: 1.2,
      ease: 'linear',
      stagger: 0.2
    })
  } catch (error) {
    console.log(error)
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

<style lang="scss" scoped>
</style>
