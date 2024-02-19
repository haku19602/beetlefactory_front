<template>
  <!-- ========== 左側固定欄 -->
  <VNavigationDrawer permanent class="pa-3" color="primary">
    <!-- === 使用者資訊 -->
    <VList>
      <VListItem :prepend-avatar="user.avatar" :title="user.account" :subtitle="user.email"></VListItem>
    </VList>

    <VDivider></VDivider>
    <!-- === 回前台 -->
    <VList nav>
      <VListItem rounded="xl" to="/" prepend-icon="mdi-home" title="回前台首頁"></VListItem>
    </VList>

    <VDivider></VDivider>
    <!-- === 導覽列 -->
    <VList nav>
      <VListItem rounded="xl" v-for="item in navItems" :key="item.to" :to="item.to" :prepend-icon="item.icon" :title="item.text"></VListItem>
    </VList>
  </VNavigationDrawer>

  <!-- ========== 右側頁面內容 -->
  <VMain>
    <!-- 對應到路由設定的子層 -->
    <RouterView></RouterView>
  </VMain>
</template>

<script setup>
import { useUserStore } from '@/store/user'
// import { computed } from 'vue'

const user = useUserStore()

const navItems = [
  { to: '/admin/products', text: '商品管理', icon: 'mdi-shopping' },
  { to: '/admin/orders', text: '訂單管理', icon: 'mdi-list-box' },
  { to: '/admin/members', text: '會員管理', icon: 'mdi-account-group' }
]

// const prependAvatar = user.avatar

// const prependAvatar = computed(() => {
//   return `https://source.boringavatars.com/beam/120/${user.account}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
// })
</script>
