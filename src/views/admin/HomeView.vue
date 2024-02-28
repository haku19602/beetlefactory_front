<template>
  <div style="background: #F8F4EB; height: 100%;">
    <VContainer style="height: 90%;">
      <VRow class="justify-center align-center" style="height: 100%;">
          <VCol class="text-center my-10 mb-3" cols="12" md="4">
            <RouterLink to="/admin/orders" class="text-decoration-none text-primary">
              <VIcon class="mb-3" color="primary" icon="mdi-cash-clock" size="128"></VIcon>
              <h2 class="mb-3">待付款訂單</h2>
              <h1 class="text-h1 font-weight-black">{{ unpaid }}</h1>
            </RouterLink>
          </VCol>

          <VCol class="text-center my-10 mb-3" cols="12" md="4">
            <RouterLink to="/admin/orders" class="text-decoration-none text-primary">
              <VIcon class="mb-3" color="primary" icon="mdi-truck-alert" size="128"></VIcon>
              <h2 class="mb-3">未出貨訂單</h2>
              <h1 class="text-h1 font-weight-black">{{ unshipped }}</h1>
            </RouterLink>
          </VCol>

      </VRow>
    </VContainer>
  </div>
</template>
<!-- ----------------------------------------------------------- -->
<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const unpaid = ref(0)
const unshipped = ref(0)

// ===== 取得未付款、未出貨訂單數量
onMounted(async () => {
  try {
    // === 發請求去後端要資料
    const { data } = await apiAuth.get('/orders/unpaid-unshipped')
    console.log(data.result.unpaid, data.result.unshipped)
    unpaid.value = data.result.unpaid
    unshipped.value = data.result.unshipped
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

<style lang="scss" scoped>
</style>
