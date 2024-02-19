<template>
  <VContainer style="height: 90%;">
    <VRow class="justify-center align-center" style="height: 100%;" >
      <!-- ===== 紅色精靈 -->
      <VCol cols="12" lg="3" class="d-flex justify-center">
        <div class="red-square d-flex justify-space-evenly align-center">
          <div class="eyes-white">
            <div class="eyes-black"></div>
          </div>
          <div class="eyes-white">
            <div class="eyes-black"></div>
          </div>
        </div>
      </VCol>
      <!-- ===== 主視覺 -->
      <VCol cols="12" lg="7" class="d-flex justify-center align-center">
        <div class="key_vision">
          <img src="@//assets/kv_beetle.png" class="kv_beetle">
          <img src="@//assets/kv_redbeetle.png" class="kv_redbeetle">
          <img src="@//assets/kv_factory.png" class="kv_factory">
          <div class="o"></div>
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
    duration: 1,
    repeat: -1,
    yoyo: true
    // ease: 'linear',
    // repeatDelay: 0.5
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
  // background-color: #818B76;
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
  background-color: #EEAE8E;
  // ----
  position: absolute;
  left: 360px;
  bottom: 140px;

}
</style>
