<template>
  <!-- ===== 手機版右側欄 -->
  <VNavigationDrawer v-model="drawer" temporary location="right" v-if="isMobile" color="primary" class="pa-3">
    <VList nav>
      <!-- 每個項目 VListItem -->
      <template v-for="item in navItemsLeft" :key="item.to">
        <VListItem :to="item.to" rounded="xl" v-if="item.show">
          <!-- icon -->
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <!-- 文字 -->
          <VListItemTitle>{{ item.text }}</VListItemTitle>
        </VListItem>
      </template>

      <VDivider class="my-3"></VDivider>

      <!-- 個人頁按鈕 -->
      <template v-for="item in navItemsRight" :key="item.to">
        <VListItem :to="item.to" rounded="xl" v-if="item.show">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <VListItemTitle>{{ item.text }}</VListItemTitle>
        </VListItem>
      </template>

      <!-- 登入註冊按鈕 VListItem -->
      <template v-for="item in navItemsSign" :key="item.to">
        <VListItem :to="item.to" rounded="xl" v-if="item.show">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <VListItemTitle>{{ item.text }}</VListItemTitle>
        </VListItem>
      </template>

      <VDivider class="my-3"></VDivider>

      <!-- 登出按鈕 VListItem -->
      <VListItem v-if="user.isLogin" rounded="xl" @click="logout">
        <template>
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
      <VBtn to="/" :active="false" color="back" class="logo">
        <VAppBarTitle>
          <v-img src="../assets/logo_home.png" alt="甲蟲工廠 | 首頁" width="75px"></v-img>
        </VAppBarTitle>
      </VBtn>

      <!-- === 選單 -->
      <!-- 1. 手機板導覽列 -->
      <template v-if="isMobile">
        <VSpacer></VSpacer>
        <!-- 顯示漢堡按鈕 -->
        <VAppBarNavIcon color="back" @click="drawer = true"></VAppBarNavIcon>
      </template>
      <!-- 2. 電腦版導覽列 -->
      <template v-else>
        <template v-for="item in navItemsLeft" :key="item.to">
          <VBtn :to="item.to" :prepend-icon="item.icon" rounded="xl" v-if="item.show">{{ item.text }}</VBtn>
        </template>
        <VSpacer></VSpacer>
        <template v-for="item in navItemsRight" :key="item.to">
          <VBtn :to="item.to" :prepend-icon="item.icon" rounded="xl" v-if="item.show">{{ item.text }}</VBtn>
        </template>
        <template v-for="item in navItemsSign" :key="item.to">
          <VBtn :to="item.to" :prepend-icon="item.icon" color="warning" rounded="xl" variant="outlined" class="sign" v-if="item.show">{{ item.text }}</VBtn>
        </template>
        <!-- 登出按鈕 -->
        <VBtn prepend-icon="mdi-logout" color="warning" rounded="xl" variant="outlined" v-if="user.isLogin" class="sign" @click="logout">登出</VBtn>
      </template>
    </VContainer>
  </VAppBar>
  <!-- ===== 頁面內容 -->
  <VMain>
    <!-- 對應到路由設定的子層 -->
    <RouterView></RouterView>
  </VMain>
</template>
<!-- ------------------------------------------------------------------------------------------ -->
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

// ===== 導覽列項目-左
const navItemsLeft = computed(() => {
  return [
    { to: '/book', text: '飼養攻略', icon: 'mdi-book-open-variant', show: true },
    { to: '/shop', text: '商店', icon: 'mdi-shopping', show: true }
  ]
})
// ===== 導覽列項目-右
const navItemsRight = computed(() => {
  return [
    { to: '/cart', text: '購物車', icon: 'mdi-cart', show: user.isLogin },
    { to: '/member', text: '我的', icon: 'mdi-account', show: user.isLogin },
    { to: '/admin', text: '管理員', icon: 'mdi-cog', show: user.isLogin && user.isAdmin }
  ]
})
// ===== 導覽列項目-註冊登入
const navItemsSign = computed(() => {
  return [
    { to: '/login', text: '登入', icon: 'mdi-login', show: !user.isLogin },
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLogin }
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
        color: 'back',
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
<!-- ------------------------------------------------------------------------------------------ -->
<style lang="scss" scoped>
.v-btn {
  font-weight: 900;
  margin: 0 5px;
  &.sign {
    border: 1.5px solid;
  }
}
</style>
