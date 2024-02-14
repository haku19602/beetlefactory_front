<template>
  <!-- ===== 手機版右側欄 -->
  <VNavigationDrawer v-model="drawer" temporary location="right" v-if="isMobile" color="primary">
    <VList nav>
      <!-- 每個項目 VListItem -->
      <template v-for="item in navItems" :key="item.to">
        <VListItem :to="item.to" rounded="xl" v-if="item.show">
          <!-- icon -->
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <!-- 文字 -->
          <VListItemTitle>{{ item.text }}</VListItemTitle>
        </VListItem>
      </template>

      <VDivider></VDivider>

      <!-- 登出按鈕 VListItem -->
      <VListItem v-if="user.isLogin" rounded="xl" @click="logout">
        <template v-slot:prepend>
            <v-icon icon="mdi-logout"></v-icon>
        </template>
        <VListItemTitle>登出</VListItemTitle>
      </VListItem>

    </VList>
  </VNavigationDrawer>

  <!-- ===== 導覽列 -->
  <VAppBar color="primary" elevation="0">
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
          <VBtn :to="item.to" :prepend-icon="item.icon" color="warning" rounded="xl" v-if="item.show">{{ item.text }}</VBtn>
        </template>
        <!-- 登出按鈕 -->
        <VBtn prepend-icon="mdi-logout" color="warning" rounded="xl" v-if="user.isLogin" @click="logout">登出</VBtn>
      </template>
    </VContainer>
  </VAppBar>
  <!-- ===== 頁面內容 -->
  <VMain>
    <!-- 對應到路由設定的子層 -->
    <RouterView></RouterView>
  </VMain>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

// ===== 手機版判斷，vuetify 內建的功能
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// ===== 手機版惻欄開關
const drawer = ref(false)

// ===== 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/strategy', text: '飼養攻略', icon: 'mdi-book-open-variant', show: true },
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLogin },
    { to: '/login', text: '登入', icon: 'mdi-login', show: !user.isLogin },
    { to: '/cart', text: '購物車', icon: 'mdi-cart', show: user.isLogin },
    { to: '/orders', text: '訂單', icon: 'mdi-list-box', show: user.isLogin },
    { to: '/admin', text: '管理', icon: 'mdi-cog', show: user.isLogin && user.isAdmin }
  ]
})

// ===== 登出按鈕執行函式
const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'primary',
        location: 'bottom'
      }
    })
    router.push('/')
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
</script>

<style lang="scss" scoped>
// .logo_home{
//   width: 100%;
//   height: 100%;
// }
</style>
