<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow class="justify-center pt-10">
        <!-- ===== 選擇項目！！！ -->
        <VCol cols="5" sm="4" md="3" lg="2">
          <VCard class="mx-auto" width="200" flat="0">
            <VList density="compact" class="bg-back">
                <VListItem v-for="(item, i) in items" :key="i" :to="item.to" :prepend-icon="item.icon" :title="item.text" color="primary" rounded="xl"></VListItem>
            </VList>
          </VCard>
        </VCol>

        <VCol cols="12" sm="8" md="9" lg="10">
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
                :color="item.done ? 'primary' : 'secondary'" class="text-back" variant= "flat" rounded :elevation="item.done ? '0' : '5'"
                :disabled="item.done || !item.paid || !item.shipped" :append-icon="item.done ? 'mdi-check' : ''"
                @click="openDialog(item)">
                {{ item.done ? '已完成' : '完成訂單' }}
              </VBtn>
            </template>
            <!-- === 下方插槽 放分頁功能 -->
            <template #bottom>
              <div class="text-center pt-2">
                <VPagination
                  v-model="tablePage"
                  :length="pages"
                  rounded="circle"
                ></VPagination>

                <!-- <v-pagination
                  v-model="tablePage"
                  :length="2"
                ></v-pagination> -->
              </div>
            </template>
          </VDataTable>
        </VCol>
      </VRow>
    </VContainer>

    <!-- ===== 完成訂單確認視窗 -->
    <VDialog v-model="dialog" width="350px">
    <VCard rounded="xl">
      <VIcon icon="mdi-alert-circle" color="secondary" size="50" class="ma-auto mt-5"></VIcon>
      <VCardText>確定完成訂單「{{ dialogId }}」嗎？此動作無法復原！</VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn color="secondary" rounded @click="closeDialog">取消</VBtn>
        <VBtn color="primary" rounded @click="update">完成訂單</VBtn>
      </VCardActions>
    </VCard>
    </VDialog>
  </div>
</template>
<!-- --------------------------------------------------------------------------- -->
<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
// // 表單驗證套件
// import * as yup from 'yup'
// import { useForm, useField } from 'vee-validate'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const items = [
  { to: '/mysetting', text: '會員設定', icon: 'mdi-cog' },
  { to: '/mylikes', text: '我的收藏', icon: 'mdi-heart' },
  { to: '/myorders', text: '我的訂單', icon: 'mdi-list-box' }
]

// ===== 更改訂單狀態對話框 正在編輯的訂單 ID
const dialogId = ref('')
// ===== 更改訂單狀態對話框 的開啟狀態
const dialog = ref(false)

// ===== 打開 更改訂單狀態對話框 function
const openDialog = (item) => {
  dialogId.value = item._id // 正在編輯的訂單 ID
  dialog.value = true // 開啟對話框
}

// ===== 關閉 更改訂單狀態對話框 function
const closeDialog = () => {
  dialog.value = false // 關閉對話框
}

// ===== 確認完成訂單 function
const update = async () => {
  try {
    await apiAuth.patch('/orders/' + dialogId.value, { done: true })
    closeDialog() // 關閉對話框
    tableLoadItems() // 重新載入訂單資料
    createSnackbar({
      text: '訂單已完成',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        location: 'bottom'
      }
    })
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
}

// // ============================= 前端 更改訂單狀態 表單驗證 =============================
// // 1.=== 定義表單驗證規則
// const schema = yup.object({
//   done: yup.boolean()
// })
// // 2.=== 先 useForm -> 表單驗證方式綁定 schema
// // handleSubmit 表單送出時的處理函式；isSubmitting 是否正在送出
// const { handleSubmit, isSubmitting } = useForm({
//   validationSchema: schema,
//   initialValues: {
//     done: false
//   }
// })
// // 3.=== 再 useField -> 綁定表單欄位 -> 表單 DOM 使用 v-model 綁定自訂義驗證 schema 的 xx 欄位驗證
// // 要跟上面 schema 的名稱對到，例如 'name'
// const done = useField('done')
// =================================================================================

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
  { title: '訂購日期', sortable: false, key: 'createdAt' },
  // { title: '訂單商品', sortable: false, key: 'cart' },
  {
    title: '訂單金額',
    sortable: false,
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
  { title: '付款狀態', sortable: false, key: 'paid', align: 'center' },
  { title: '出貨狀態', sortable: false, key: 'shipped', align: 'center' },
  { title: '完成訂單', sortable: false, key: 'done', align: 'center' }
]
// === 表格載入狀態 -> 用來顯示載入中
const tableLoading = ref(true)
// === 表格全部資料數 -> 用來計算分頁數
const tableItemsLength = ref(0)
// === 表格總頁數
const pages = ref(1)
// -------------------------------------------------------------------------------------------------------------------------
// ===== 取得訂單資料，並存入 orders 陣列
const tableLoadItems = async () => {
  // --- 載入時顯示載入中
  // tableLoading.value = true

  try {
    const { data } = await apiAuth.get('/orders')
    // --- 處理分頁
    // 取資料總數
    tableItemsLength.value = data.result.length

    // 從所有資料陣列擷取第x頁資料陣列
    orders.value = data.result.slice((tablePage.value - 1) * 5, tablePage.value * 5)

    // 重新計算分頁數
    pages.value = Math.ceil(tableItemsLength.value / 5)

    // --- 已排序＋分頁的資料放進 orders 陣列
    // orders.value.push(...newOrders)
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
}
tableLoadItems()

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
