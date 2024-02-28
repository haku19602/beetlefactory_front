<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow class="justify-center pt-10">
        <VCol cols="12">
          <h2 class="text-center mt-6 text-primary">訂單明細</h2>
        </VCol>
        <VCol cols="12">
          <VBtn class="text-start" variant="outlined" color="primary" rounded @click="router.go(-1)">返回</VBtn>
        </VCol>
        <!-- ===== 訂單資訊 -->
        <VCol cols="12">
          <VChip class="text-primary text-subtitle-1 font-weight-bold " variant="text" prepend-icon="mdi-information">訂單資訊</VChip>
          <VDivider class="my-2"></VDivider>
        </VCol>

        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">訂單編號：</VCol>
        <VCol cols="6" md="4"> {{ order._id }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">訂購日期：</VCol>
        <VCol cols="6" md="4"> {{ new Date(order.createdAt).toLocaleString('zh-TW', { hour6: false, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">商品金額：</VCol>
        <VCol cols="6" md="4">
          NT. {{ order.price }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">運費：</VCol>
        <VCol cols="6" md="4">NT. {{ order.deliveryFee }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">總金額：</VCol>
        <VCol cols="6" md="4">NT. {{ (order.price) + (order.deliveryFee) }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">付款狀態：</VCol>
        <VCol cols="6" md="4">{{ order.paid ? '已付款' : '未付款' }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">出貨狀態：</VCol>
        <VCol cols="6" md="4">{{ order.shipped ? '已出貨' : '未出貨' }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">完成訂單：</VCol>
        <VCol cols="6" md="4">{{ order.done ? '已完成' : '未完成' }}</VCol>

        <!-- ===== 收件資訊 -->
        <VCol cols="12">
          <VChip class="text-primary text-subtitle-1 font-weight-bold mt-5" variant="text" prepend-icon="mdi-mail">收件資訊</VChip>
          <VDivider class="my-2"></VDivider>
        </VCol>

        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">收件人姓名：</VCol>
        <VCol cols="6" md="4"> {{ order.name }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">收件人電話：</VCol>
        <VCol cols="6" md="4"> {{ order.phone }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">運送方式：</VCol>
        <VCol cols="6" md="4"> {{ order.delivery }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">收件地址：</VCol>
        <VCol cols="6" md="4"> {{ order.address }}</VCol>
        <VCol cols="6" md="2" class="text-grey-darken-1 ps-5">訂單備註：</VCol>
        <VCol cols="6" md="10"> {{ order.note }}</VCol>

        <!-- ===== 訂單商品 -->
        <VCol cols="12">
          <VChip class="text-primary text-subtitle-1 font-weight-bold mt-5" variant="text" prepend-icon="mdi-list-box">訂單商品</VChip>
          <VDivider class="my-2"></VDivider>
        </VCol>
        <!-- <template>{{ order.cart }}</template> -->
        <VCol>
          <VRow v-for="item in order.cart" :key="item._id">
            <!-- --- 圖片 -->
            <VCol cols="6" lg="3">
                <VImg :src="item.product.image" aspect-ratio="1"></VImg>
            </VCol>
            <!-- --- 商品名稱、價格、數量、小計 -->
            <VCol cols="6" lg="9" class="d-flex flex-column flex-lg-row">
              <VCol lg="4">
                <div>
                  <h3>{{ item.product.name }}</h3>
                  <p class="text-grey-darken-1">NT. {{ item.product.price }}</p>
                </div>
                <VChip density="comfortable" class="mt-2" variant="outlined" color="primary">{{ item.product.category }}</VChip>
              </VCol>
              <VCol lg="4">
                <p>數量：{{ item.quantity }}</p>
              </VCol>
              <VCol lg="4">
                <p>小計：NT. <b>{{ item.product.price * item.quantity }}</b></p>
              </VCol>
            </VCol>
            <VDivider class="mx-3 my-3"></VDivider>
          </VRow>
        </VCol>

      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const route = useRoute()
const router = useRouter()
const createSnackbar = useSnackbar()

// ===== 訂單要接收的資料預設值
const order = ref({ // 建議要打預設值，不然會有可能出現 undefined 的情況
  _id: '',
  createdAt: '',
  cart: [],
  delivery: '',
  address: '',
  name: '',
  phone: '',
  note: '',
  paid: false,
  shipped: false,
  done: false,
  // 以下是計算出來的
  price: 0, // 商品金額
  deliveryFee: 0 // 運費
})

// ===== 發請求去後端要該商品資料
onMounted(async () => { // 元件被掛到 DOM 時，才會發請求
  try {
    // === 對後端要商品資料
    const { data } = await apiAuth.get('/orders/' + route.params.id) // data 是 axios 的 response 物件
    // === 把要到的資料放進 products 陣列
    order.value._id = data.result._id
    order.value.createdAt = data.result.createdAt
    order.value.cart = data.result.cart
    order.value.delivery = data.result.delivery
    order.value.address = data.result.address
    order.value.name = data.result.name
    order.value.phone = data.result.phone
    order.value.note = data.result.note
    order.value.paid = data.result.paid
    order.value.shipped = data.result.shipped
    order.value.done = data.result.done
    // === 計算商品金額
    order.value.price = data.result.cart.reduce((total, current) => {
      return total + current.quantity * current.product.price
    }, 0)
    // === 計算運費
    if (data.result.delivery === '黑貓') {
      order.value.deliveryFee = 110
    } else if (data.result.delivery === '7-11 交貨便') {
      order.value.deliveryFee = 70
    }
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
    // === 跳轉到商店頁
    router.push('/shop')
  }
})

</script>

<style lang="scss" scoped>
</style>
