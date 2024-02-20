<template>
<div style="height: 100%;" class="bg-back">
  <VContainer>
    <VRow>
      <VCol cols="12" lg="3">
        <VAvatar :image="user.avatar" size="300"></VAvatar>
        <h1 class="text-primary">{{ user.account }}</h1>
        <h3 class="text-primary">{{ user.email }}</h3>
      </VCol>
      <VCol cols="12" lg="7">

      </VCol>
    </VRow>
  </VContainer>
</div>
<!--
  <h2>會員資料修改</h2>
  <h2>訂單</h2>
  <h2>收藏</h2>
-->
</template>
<!-- ------------------------------------------------------------------------ -->
<script setup>
import { useUserStore } from '@/store/user'

const user = useUserStore()

</script>
<!-- ------------------------------------------------------------------------ -->
<style lang="scss" scoped>
</style>
