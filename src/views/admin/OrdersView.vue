<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow class="justify-center">
        <!-- ===== title -->
        <VCol cols="12" lg="11">
          <h2 class="text-center mt-10 text-primary">訂單列表</h2>
        </VCol>

        <!-- ===== 訂單列表 -->
        <VCol cols="12" lg="11">
          <!-- :items="orders" 綁定表格每個項目從 orders 陣列來 -->
          <!-- :headers="headers" 綁定表格的標題 -->
          <VDataTable
            :items="orders"
            :headers="headers"
            v-model:items-per-page="tableItemsPerPage"
            v-model:sort-by="tableSortBy"
            v-model:page="tablePage"
            :search="tableSearch"
            :items-length="tableItemsLength"
            :loading="tableLoading"
            @update:items-per-page="tableLoadItems"
            @update:sort-by="tableLoadItems"
            @update:page="tableLoadItems"
            class="py-5 px-10 bg-back">
            <!-- === 上方插槽 放搜尋訂單編號功能，暫時失敗 -->
            <!-- <template #top>
              <VTextField label="請搜尋訂單編號" prepend-inner-icon="mdi-magnify" v-model="tableSearch" variant="underlined"
                @click:prepend-inner="tableApplySearch" @keydown.enter="tableApplySearch">
              </VTextField>
            </template> -->
            <!-- === 指定 avatar 欄位的顯示方式 -->
            <template #[`item.user.avatar`]="{ item }">
              <VAvatar size="35">
                <VImg :src="item.user.avatar" contain></VImg>
              </VAvatar>
            </template>
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
              <VBtn
                variant="outlined" rounded density="comfortable" class="px-0"
                :color="item.paid ? ['primary'] : ['secondary']"
                @click="openDialog(item)">
                {{ item.paid ? '已付款' : '未付款' }}
              </VBtn>
            </template>
            <!-- === 出貨狀態顯示 -->
            <template #[`item.shipped`]="{ item }">
              <VBtn
                variant="outlined" rounded density="comfortable" class="px-0"
                :color="item.shipped ? ['primary'] : ['secondary']"
                @click="openDialog(item)">
                {{ item.shipped ? '已出貨' : '未出貨' }}
              </VBtn>
            </template>
            <!-- === 完成訂單顯示 -->
            <template #[`item.done`]="{ item }">
              <VChip
                color="primary" variant="text">
                {{ item.done ? '已完成' : '未完成' }}
              </VChip>
            </template>
          </VDataTable>
        </VCol>
      </VRow>
    </VContainer>

  <!-- ===== 付款狀態 確認視窗 -->
    <VDialog v-model="dialog" width="500px">
      <VForm :disabled="isSubmitting" @submit.prevent="update">
        <VCard rounded="xl">
          <VIcon icon="mdi-update" color="primary" size="60" class="ma-auto mt-8 mb-3"></VIcon>
          <VCardTitle class="text-center">更新 {{ dialogId }} 訂單狀態</VCardTitle>

          <VCardText>
            <VContainer>
              <VRow>
                <VCol cols="6">
                  <VSwitch
                    :label="paid.value.value ? '已付款' : '未付款'"
                    color="primary" inset class="ps-5"
                    v-model="paid.value.value" :error-messages="paid.errorMessage.value"
                    ></VSwitch>
                </VCol>
                <VCol cols="6">
                  <VSwitch
                    :label="shipped.value.value ? '已出貨' : '未出貨'"
                    color="primary" inset
                    v-model="shipped.value.value" :error-messages="shipped.errorMessage.value"
                    ></VSwitch>
                </VCol>
              </VRow>
            </VContainer>
          </VCardText>

          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn color="secondary" rounded @click="closeDialog" :disabled="isSubmitting">取消</VBtn>
            <VBtn color="primary" rounded type="submit" :loading="isSubmitting">更改訂單狀態</VBtn>
          </VCardActions>
        </VCard>
      </VForm>
    </VDialog>
  </div>
</template>
<!-- --------------------------------------------------------------------------- -->
<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
// 表單驗證套件
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

// ===== 表單對話框正在編輯的訂單 ID
const dialogId = ref('')
// ===== 付款對話框的開啟狀態
const dialog = ref(false)

// ===== 打開 更改訂單狀態對話框 function
const openDialog = (item) => {
  dialogId.value = item._id // 正在編輯的訂單 ID
  paid.value.value = item.paid // 正在編輯的訂單付款狀態
  shipped.value.value = item.shipped // 正在編輯的訂單出貨狀態
  dialog.value = true // 開啟對話框
}
// ===== 關閉 更改訂單狀態對話框 function
const closeDialog = () => {
  dialog.value = false // 關閉對話框
}

// ==================== 前端 更改訂單狀態 表單驗證 ====================
// 1.=== 定義表單驗證規則
const schema = yup.object({
  paid: yup.boolean(),
  shipped: yup.boolean()
})
// 2.=== 先 useForm -> 表單驗證方式綁定 schema
// handleSubmit 表單送出時的處理函式；isSubmitting 是否正在送出
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    paid: false,
    shipped: false
  }
})
// 3.=== 再 useField -> 綁定表單欄位 -> 表單 DOM 使用 v-model 綁定自訂義驗證 schema 的 xx 欄位驗證
// 要跟上面 schema 的名稱對到，例如 'name'
const paid = useField('paid')
const shipped = useField('shipped')
// ====================================================

// ===== 更改訂單付款、出貨狀態 function
const update = handleSubmit(async () => {
  try {
    // const { data } =
    await apiAuth.patch('/orders/' + dialogId.value, {
      paid: paid.value.value,
      shipped: shipped.value.value
    })
    // 成功通知
    createSnackbar({
      text: '訂單狀態已更改',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'primary',
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
  closeDialog()
  tableApplySearch() // 重新載入商品列表，而且回到第一頁 -> 剛好可以套用搜尋功能的重新載入
})

// ========================================= 訂單列表 =========================================
// ===== 用來儲存訂單資料 -> 顯示在表格上
const orders = ref([])

// === 表格每頁幾個
const tableItemsPerPage = ref(10)
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
  { title: '訂購人', sortable: false, key: 'user.avatar' },
  { title: '', sortable: true, key: 'user.account' },
  { title: '訂單編號', sortable: false, key: '_id' },
  { title: '訂購日期', sortable: true, key: 'createdAt' },
  // { title: '訂單商品', sortable: false, key: 'cart' },
  {
    title: '金額',
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
// === 表格搜尋文字
const tableSearch = ref('')

// ===== 取得訂單資料，並存入 orders 陣列(不排序版)
// onMounted(async () => {
//   try {
//     const { data } = await apiAuth.get('/orders/all')
//     orders.value.push(...data.result)
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

// ===== 取得訂單資料，並存入 orders 陣列
const tableLoadItems = async () => {
  // --- 載入時顯示載入中
  tableLoading.value = true

  try {
    const { data } = await apiAuth.get('/orders/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order === 'asc' ? 1 : -1,
        search: tableSearch.value
      }
    })
    // --- 已排序＋分頁的資料撈回來後，把上次放入的全刪除，再把資料放進 orders 陣列
    orders.value.splice(0, orders.value.length, ...data.result.data) // data 是 axios 的 res 整個物件，result 是後端回傳的資料，裡面的 data 是商品資料，total 是全部資料數
    // --- 將資料總數數放進 tableItemsLength
    tableItemsLength.value = data.result.total
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

// ===== 送出搜尋時 表格套用搜尋
const tableApplySearch = () => {
  // 回到第一頁資料
  tablePage.value = 1
  // 重新載入資料
  tableLoadItems()
}
// ==============================================================

</script>
<!-- --------------------------------------------------------------------------- -->

<style lang="scss" scoped>
</style>
