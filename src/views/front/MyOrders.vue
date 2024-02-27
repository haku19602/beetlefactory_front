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
            :items="orders" :headers="headers"
            :items-per-page="5"

            :sort-by="tableSortBy"
            v-model:page="tablePage"
            :items-length="tableItemsLength"
            :loading="tableLoading"
            @update:page="tableLoadItems"

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
            <template #[`item.price`]="{ item }">
              NT. {{ item.cart.reduce((total, current) => {
                return total + current.quantity * current.product.price
              }, 0) + (item.delivery === '黑貓' ? 110 : item.delivery === '7-11 交貨便' ? 70 : 0)}}
            </template>
            <!-- === 付款狀態顯示 -->
            <template #[`item.paid`]="{ item }">
              <VChip
                :append-icon="item.paid ? 'mdi-check' : 'mdi-close'"
                variant="text"
                :class="item.paid ? ['text-primary'] : ['text-secondary']">
                {{ item.paid ? '已付款' : '未付款' }}
              </VChip>
            </template>
            <!-- === 出貨狀態顯示 -->
            <template #[`item.shipped`]="{ item }">
              <VChip
                :append-icon="item.shipped ? 'mdi-check' : 'mdi-close'"
                variant="text"
                :class="item.shipped ? ['text-primary'] : ['text-secondary']">
                {{ item.shipped ? '已出貨' : '未出貨' }}
              </VChip>
            </template>
            <!-- === 完成訂單顯示 -->
            <template #[`item.done`]="{ item }">
              <VBtn
                color="primary" variant="flat" rounded
                :disabled="item.done || !item.paid">
                {{ item.done ? '訂單已完成' : '完成訂單' }}
              </VBtn>
            </template>
            <!-- === 下方插槽 放分頁功能 -->
            <template #bottom>
              <div class="text-center pt-2">
                <v-pagination
                  v-model="tablePage"
                  :length="2"
                ></v-pagination>
              </div>
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

// ==================================== 訂單列表 ====================================
// ===== 用來儲存訂單資料
const orders = ref([])

// === 表格排序
const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' } // 預設以建立時間倒序排列
])
// === 表格目前頁碼
const tablePage = ref(1)

// ===== 設定表格的標題
// 欄位名稱是固定的不用 ref，直接宣告，多語言就要寫成 computed
// key 是後端回傳的資料 key，用 datatable 內建 :items 自動產生表格
const headers = [
  { title: '訂單編號', sortable: false, key: '_id' },
  { title: '訂購日期', sortable: true, key: 'createdAt' },
  // { title: '訂單商品', sortable: false, key: 'cart' },
  {
    title: '訂單金額',
    sortable: true,
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
  { title: '出貨狀態', sortable: true, key: 'shipped', align: 'center' },
  { title: '完成訂單', sortable: true, key: 'done', align: 'center' }
]
// === 表格載入狀態 -> 用來顯示載入中
const tableLoading = ref(true)
// === 表格全部資料數 -> 用來計算分頁數
const tableItemsLength = ref(0)

// ===== 取得訂單資料，並存入 orders 陣列
onMounted(async () => {
  // --- 載入時顯示載入中
  tableLoading.value = true

  try {
    const { data } = await apiAuth.get('/orders')
    // 處理分頁
    tableItemsLength.value = data.result.length
    const newOrders = data.result.slice((tablePage.value - 1) * 5, tablePage.value * 5)

    orders.value.push(...newOrders) // data 是 axios 的 res 整個物件，result 是後端回傳的資料
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
  // --- 載入完成後關閉載入中
  tableLoading.value = false
})

// ===== 取得訂單資料，並存入 orders 陣列
// const tableLoadItems = async () => {
//   // --- 載入時顯示載入中
//   tableLoading.value = true

//   try {
//     const { data } = await apiAuth.get('/orders', {
//       params: {
//         page: tablePage.value
//       }
//     })

//     // // tableItemsLength 是用來計算分頁數的，所以要更新
//     // tableItemsLength.value = data.result.length

//     // --- 已排序＋分頁的資料撈回來後，把上次放入的全刪除，再把資料放進 orders 陣列
//     orders.value.splice(0, orders.value.length, ...data.result.data) // data 是 axios 的 res 整個物件，result 是後端回傳的資料，裡面的 data 是商品資料，total 是全部資料數
//     // --- 將全部資料數放進 tableItemsLength
//     tableItemsLength.value = data.result.total
//   } catch (error) {
//     const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
//     createSnackbar({
//       text,
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'secondary',
//         location: 'bottom'
//       }
//     })
//   }
// }
// tableLoadItems()
// =================================================================================

</script>
<!-- --------------------------------------------------------------------------- -->

<style lang="scss" scoped>
// .my-overflow {
//   overflow-x: scroll;
// }
</style>
