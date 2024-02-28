<template>
  <VContainer style="height: 90%;">
    <VRow class="justify-center align-center h-100 flex-lg-row-reverse">

      <!-- ===== 主視覺 -->
      <VCol cols="12" lg="7" class="d-flex justify-center align-center">
        <div class="key_vision">
          <img src="@//assets/kv_beetle.png" class="kv_beetle">
          <img src="@//assets/kv_redbeetle.png" class="kv_redbeetle">
          <img src="@//assets/kv_factory.png" class="kv_factory">
          <div class="o bg-secondary2"></div>
        </div>
      </VCol>
      <!-- ===== 紅色精靈 -->
      <VCol cols="12" lg="3" class="d-flex justify-center">
        <div class="red-square d-flex justify-space-evenly align-center bg-secondary">
          <div class="eyes-white bg-back">
            <div class="eyes-black"></div>
          </div>
          <div class="eyes-white bg-back">
            <div class="eyes-black"></div>
          </div>
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  // ===== 眼珠動畫
  gsap.from('.eyes-black', {
    top: '35%',
    left: '15%',
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: 'linear',
    repeatDelay: 0.5
  })
  // ===== O 彈跳動畫
  gsap.from('.o', {
    bottom: '85px',
    height: '100px',
    duration: 0.8,
    repeat: -1,
    yoyo: true
  })
  // ===== beetle 動畫
  gsap.from('.kv_beetle', {
    top: '-250px',
    opacity: 0,
    duration: 1.6
  })
  // ===== factory 動畫
  gsap.from('.kv_factory', {
    bottom: '-250px',
    opacity: 0,
    duration: 1.6
  })
})
</script>

<style lang="scss" scoped>
.red-square{
  width: 220px;
  height: 280px;
  border-radius: 50px;
}
.eyes-white{
  width: 80px;
  height: 55px;
  border-radius: 50%;
  // ---
  position: relative;

}
.eyes-black{
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background: #333;
  // ---
  position: absolute;
  top: 15%;
  left: 50%;
}
// ===========
.key_vision{
  width: 650px;
  height: 500px;
  position: relative;
}
.kv_beetle{
  width: 545px;
  position: absolute;
  top: 95px;
}
.kv_redbeetle{
  width: 390px;
  position: absolute;
}
.kv_factory{
  width: 650px;
  position: absolute;
  bottom: 45px;
}
.o{
  width: 100px;
  height: 100px;
  border-radius: 100%;
  // ----
  position: absolute;
  left: 360px;
  bottom: 140px;
}
</style>
