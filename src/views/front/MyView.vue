<template>
  <VContainer style="height: 90%;">
    <VRow class="justify-center align-center" style="height: 100%;">
      <VHover v-slot="{ isHovering, props }">
        <VCol class="text-center my-10 mb-3" cols="12" md="4">
          <RouterLink to="/mysetting" class="text-decoration-none text-back">
            <VIcon color="back" icon="mdi-cog" :size="isHovering ? 135 : 128" v-bind="props"></VIcon>
            <h1>會員設定</h1>
            <h2>SETTING</h2>
          </RouterLink>
        </VCol>
      </VHover>

      <VHover v-slot="{ isHovering, props }">
        <VCol class="text-center my-10 mb-3" cols="12" md="4">
          <RouterLink to="/mylikes" class="text-decoration-none text-back">
            <VIcon  color="back" icon="mdi-heart" :size="isHovering ? 135 : 128" v-bind="props"></VIcon>
            <h1>我的收藏</h1>
            <h2>FAVORITE</h2>
          </RouterLink>
        </VCol>
      </VHover>

      <VHover v-slot="{ isHovering, props }">
        <VCol class="text-center my-10 mb-3" cols="12" md="4">
          <RouterLink to="/myorders" class="text-decoration-none text-back">
            <VIcon  color="back" icon="mdi-list-box" :size="isHovering ? 135 : 128" v-bind="props"></VIcon>
            <h1>我的訂單</h1>
            <h2>ORDER</h2>
          </RouterLink>
        </VCol>
      </VHover>

    </VRow>
  </VContainer>
</template>

<style lang="scss" scoped>
</style>
