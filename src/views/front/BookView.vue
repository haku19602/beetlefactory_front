<template>
  <VContainer style="height: 90%;">
    <VRow class="justify-center align-center" style="height: 100%;">
      <VCol lg="6" v-if="!isMobile" class="my-10">
        <div id="title" class="ms-auto">
          <h1 class="text-h2 font-weight-black text-green2">飼養攻略</h1>
        </div>
      </VCol>

      <VCol lg="6">
        <VCol class="text-center my-10" cols="12">
          <VBtn to="/bookbaby" class="bg-secondary2">
            <h1 class="text-h3 font-weight-black text-primary">幼蟲</h1>
          </VBtn>
        </VCol>

        <VCol class="text-center my-10" cols="12">
          <VBtn to="/bookadult" class="bg-secondary2">
            <h1 class="text-h3 font-weight-black text-primary">成蟲</h1>
          </VBtn>
        </VCol>

        <VCol class="text-center my-10" cols="12">
          <VBtn to="/bookdead" class="bg-secondary2">
            <h1 class="text-h3 font-weight-black text-primary">標本</h1>
          </VBtn>
        </VCol>
      </VCol>
    </VRow>
  </VContainer>

</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed } from 'vue'

// ===== 手機版判斷，vuetify 內建的功能
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)
</script>

<style lang="scss" scoped>
.v-btn{
  width: 200px;
  height: 100px;
  border-radius: 50px;
  transform: rotate(15deg);
  box-shadow: 5px 16px 0px 0px rgba(225,104,69, 1);
  position: relative;
  transition: 0.05s;

  &:hover{
    box-shadow: 5px 10px 0px 0px rgba(225,104,69, 1);
    top: 7px;
  }
}

#title{
  width: 400px;
  height: 150px;
  border-radius: 75px;
  border: 5px solid rgba(178,201,168, 1);
  transform: rotate(15deg);

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
