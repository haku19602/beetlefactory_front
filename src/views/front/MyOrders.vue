<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow>
        <VCol>
          <h2 class="text-center mt-5 text-primary">我的訂單</h2>
        </VCol>

        <VCol cols="12">
          <!-- :items="orders" 綁定表格每個項目從 orders 陣列來 -->
          <!-- :headers="headers" 綁定表格的標題 -->
          <VDataTable
            :items="orders"
            :headers="headers"
            :items-per-page="5"
            class="bg-back">
            <!-- === 訂單編號顯示 -->
            <template #[`item._id`]="{ item }">
              <RouterLink :to="'/orders/' + item._id" class="text-primary">{{ item._id }}</RouterLink>
            </template>
            <!-- === 訂購日期顯示 -->
            <template #[`item.createdAt`]="{ item }">
              <!-- {{ new Date(item.createdAt).toLocaleDateString() }} 只顯示日期 -->
              {{ new Date(item.createdAt).toLocaleString('zh-TW', { hour12: false, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'  }) }}
            </template>
            <!-- === 訂單商品顯示 -->
            <!-- <template #[`item.cart`]="{ item }">
              <VChip
                v-for="(product, index) in item.cart" :key="index"
                color="grey" variant="outlined" class="mr-2">
                {{ product.product.name }} x {{ product.quantity }}
              </VChip>
            </template> -->
            <!-- === 訂單金額顯示 -->
            <!-- <template #[`item.price`]="{ item }">
              {{ item.cart.reduce((total, current) => {
                return total + current.quantity * current.product.price
              }, 0) }}
            </template> -->
            <!-- === 付款狀態顯示 -->
            <template #[`item.paid`]="{ item }">
              <VChip
                variant="outlined"
                :class="item.paid ? ['text-primary'] : ['text-error']">
                {{ item.paid ? '付款確認' : '尚未付款' }}
              </VChip>
            </template>
            <!-- === 完成訂單顯示 -->
            <template #[`item.done`]="{ item }">
              <VBtn color="primary" variant="flat" rounded :disabled="item.done || !item.paid">
                完成訂單
                <!-- {{ item.done ? '已完成' : '未完成' }} -->
              </VBtn>
            </template>
          </VDataTable>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
<!-- --------------------------------------------------------------------------- -->
<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

// ===== 用來儲存訂單資料
const orders = ref([])

// ===== 設定表格的標題
// 欄位名稱是固定的不用 ref，直接宣告，多語言就要寫成 computed
// key 是後端回傳的資料 key，用 datatable 內建 :items 自動產生表格
const headers = [
  { title: '訂單編號', sortable: true, key: '_id' },
  { title: '訂購日期', sortable: true, key: 'createdAt' },
  // { title: '訂單商品', sortable: false, key: 'cart' },
  {
    title: '訂單金額',
    key: 'price', // 後端沒有 price 欄位，是自己新增計算來的
    align: 'center',
    value: (item) => {
      const total = item.cart.reduce((total, current) => {
        return total + current.quantity * current.product.price
      }, 0)
      if (item.delivery === '黑貓') {
        return total + 110
      } else if (item.delivery === '7-11 交貨便') {
        return total + 70
      } else {
        return total
      }
    }
  },
  { title: '付款狀態', sortable: true, key: 'paid', align: 'center' },
  { title: '完成訂單', sortable: true, key: 'done', align: 'center' }
]

// ===== 取得訂單資料，並存入 orders 陣列
onMounted(async () => {
  try {
    const { data } = await apiAuth.get('/orders')
    orders.value.push(...data.result) // data 是 axios 的 res 整個物件，result 是後端回傳的資料
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
<!-- --------------------------------------------------------------------------- -->

<style lang="scss" scoped>
</style>
