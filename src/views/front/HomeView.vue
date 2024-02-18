<template>
  <VContainer style="height: 90%; background: white;">
    <VRow class="justify-center align-center" style="height: 100%; background: papayawhip;" >
      <!-- 紅色精靈 -->
      <VCol cols="12" md="3" class="d-flex justify-center" style="background: white;">
        <div class="red-square d-flex justify-space-evenly align-center">
          <div class="eyes-white">
            <div class="eyes-black"></div>
          </div>
          <div class="eyes-white">
            <div class="eyes-black"></div>
          </div>
        </div>
      </VCol>

      <!-- logo 主視覺 -->
      <VCol cols="12" md="7" style="background: gainsboro;">
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

// ===== 眼珠動畫
onMounted(() => {
  gsap.from('.eyes-black', {
    top: '35%',
    left: '15%',
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: 'linear',
    repeatDelay: 0.5
  })
})
</script>

<style lang="scss" scoped>
.red-square{
  width: 260px;
  height: 330px;
  border-radius: 50px;
  background-color: #E16845;
}
.eyes-white{
  width: 85px;
  height: 60px;
  border-radius: 50%;
  background: #F8F4EB;
  // ---
  position: relative;

}
.eyes-black{
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: #000;
  // ---
  position: absolute;
  top: 15%;
  left: 50%;
}
</style>
