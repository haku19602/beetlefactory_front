<template>
  <VContainer style="height: 90%;">
    <VRow class="justify-center align-center h-100">
      <VCol cols="12" md="2" class="text-center">
        <VBtn class="bg-secondary2">
          <h2 class="text-primary">標本</h2>
        </VBtn>
      </VCol>

      <VCol cols="12" md="10">
        <v-stepper flat alt-labels prev-text="上一步" next-text="下一步" :items="['冷凍', '泡水', '定位', '烘乾', '保存']" class="bg-primary w-100">
          <template v-slot:item.1>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                儘速冷凍死掉的甲蟲屍體，避免腐爛造成斷頭斷腳，頭身分離。
              </v-card-text>
            </v-card>
          </template>
    
          <template v-slot:item.2>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                準備開始做標本前，將冷凍的甲蟲泡水解凍，軟化關節以利後續調整姿勢。
              </v-card-text>
            </v-card>
          </template>
    
          <template v-slot:item.3>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                使用針將甲蟲固定在針插板上，調整甲蟲的姿勢，使其看起來自然且美觀。確保甲蟲的觸鬚和腳都展開，並且不相互重疊。
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:item.4>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                將甲蟲放在烘乾機中低溫烘乾，確保其完全乾燥，過高的溫度可能會破壞彩虹鍬美麗的鞘翅呈色。這一步可能需要一段時間，具體時間取決於甲蟲的大小和環境濕度。
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:item.5>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                將完成的甲蟲標本放進標本箱中，存放在乾燥、陰涼的地方，避免陽光直射和過高的溫度，可使用樟腦丸避免長蟲。
              </v-card-text>
            </v-card>
          </template>

        </v-stepper>
      </VCol>

    </VRow>
  </VContainer>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.v-btn{
  width: 100px;
  height: 50px;
  border-radius: 25px;
  transform: rotate(15deg);
  box-shadow: 3px 10px 0px 0px rgba(225,104,69, 1);
}
</style>
