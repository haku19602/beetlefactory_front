<template>
  <!-- ===== 手機版右側欄 -->
  <VNavigationDrawer v-model="drawer" temporary location="right" v-if="isMobile">
    <VList nav>
      <!-- 每個項目 VListItem -->
      <template v-for="item in navItems" :key="item.to">
        <VListItem :to="item.to" rounded="xl">
          <!-- icon -->
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <!-- 文字 -->
          <VListItemTitle>{{ item.text }}</VListItemTitle>
        </VListItem>
      </template>
    </VList>
  </VNavigationDrawer>

  <!-- ===== 導覽列 -->
  <VAppBar color="primary">
    <VContainer class="d-flex align-center">
      <!-- === 首頁 logo -->
      <VBtn to="/" :active="false" color="back">
        <VAppBarTitle>
          <!-- <img class="logo_home" src="../assets/logo_home.png" alt="甲蟲工廠 首頁"> -->
          甲蟲工廠 BeetleFactory
        </VAppBarTitle>
      </VBtn>

      <VSpacer></VSpacer>
      <!-- === 選單 -->
      <!-- 1. 手機板導覽列 -->
      <template v-if="isMobile">
        <!-- 顯示漢堡按鈕 -->
        <VAppBarNavIcon color="back" @click="drawer = true"></VAppBarNavIcon>
      </template>
      <!-- 2. 電腦版導覽列 -->
      <template v-else>
        <template v-for="item in navItems" :key="item.to">
          <VBtn :to="item.to" :prepend-icon="item.icon" color="warning" rounded="xl">{{ item.text }}</VBtn>
        </template>
      </template>
    </VContainer>
  </VAppBar>
  <!-- ===== 頁面內容 -->
  <VMain>
    <RouterView></RouterView>
  </VMain>
</template>

<!--
<div>
  <router-link to="/">Home</router-link>
  <router-link to="/register">Register</router-link>
  <router-link to="/login">Login</router-link>
</div>
<router-view />
-->
<!-- 對應到路由設定的子層 -->

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'

// 手機版判斷，vuetify 內建的功能
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// 手機版惻欄開關
const drawer = ref(false)

// 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/register', text: '註冊', icon: 'mdi-account-plus' },
    { to: '/login', text: '登入', icon: 'mdi-login' }
    // { to: '/cart', text: '購物車', icon: 'mdi-cart' },
    // { to: '/orders', text: '訂單', icon: 'mdi-list-box' },
    // { to: '/admin', text: '管理', icon: 'mdi-cog' }
  ]
})
</script>

<!--
<style lang="scss">
.logo_home{
  width: 100%;
  height: 100%;
}
</style>
-->
