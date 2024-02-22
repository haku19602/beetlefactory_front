<template>
  <VContainer style="height: 90%;">
    <VRow class="justify-center align-center" style="height: 100%;">
      <VCol class="text-center my-10" cols="12" md="4">
        <RouterLink to="/mysetting" class="text-decoration-none text-back">
          <VIcon class="mb-3" color="back" icon="mdi-cog" size="128"></VIcon>
          <h1>會員設定</h1>
          <h2>SETTING</h2>
        </RouterLink>
      </VCol>

      <VCol class="text-center my-10" cols="12" md="4">
        <RouterLink to="/mylikes" class="text-decoration-none text-back">
          <VIcon class="mb-3" color="back" icon="mdi-heart" size="128"></VIcon>
          <h1>我的收藏</h1>
          <h2>FAVORITE</h2>
        </RouterLink>
      </VCol>

      <VCol class="text-center my-10" cols="12" md="4">
        <RouterLink to="/myorders" class="text-decoration-none text-back">
          <VIcon class="mb-3" color="back" icon="mdi-list-box" size="128"></VIcon>
          <h1>我的訂單</h1>
          <h2>ORDER</h2>
        </RouterLink>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss" scoped>
</style>
