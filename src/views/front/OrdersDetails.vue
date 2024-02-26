<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow>
        <!-- <VCol>
          <h2 class="text-center mt-5 text-primary">訂單明細</h2>
        </VCol>
        <VCol cols="12">
          <VCard>
            <VCardTitle>
              <h3 class="text-primary">訂單編號: {{ order._id }}</h3>
            </VCardTitle>
            <VCardText>
              <VDataTable
                :items="order.cart"
                :headers="headers"
                class="bg-back">
                <template #[`item.product.name`]="{ item }">
                  {{ item.product.name }}
                </template>
                <template #[`item.quantity`]="{ item }">
                  {{ item.quantity }}
                </template>
                <template #[`item.product.price`]="{ item }">
                  {{ item.product.price }}
                </template>
                <template #[`item.quantity * item.product.price`]="{ item }">
                  {{ item.quantity * item.product.price }}
                </template>
              </VDataTable>
            </VCardText>
            <VCardActions>
              <VBtn color="primary" @click="handleBack">返回</VBtn>
            </VCardActions>
          </VCard>
        </VCol> -->

      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'

// ===== 訂單要接收的資料預設值
const order = ref({ // 建議要打預設值，不然會有可能出現 undefined 的情況
  _id: '',
  createdAt: '',
  cart: 0,
  user_account: '',
  image: '',
  sell: true,
  category: '',
  stock: 0,
  stockText: ''
})
</script>

<style lang="scss" scoped>
</style>
