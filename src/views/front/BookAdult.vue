<template>
  <VContainer style="height: 90%;">
    <VRow class="justify-center align-center h-100">
      <VCol cols="12" md="2" class="text-center">
        <VBtn class="bg-secondary2">
          <h2 class="text-primary">成蟲</h2>
        </VBtn>
      </VCol>

      <VCol cols="12" md="10">
        <v-stepper flat alt-labels prev-text="上一步" next-text="下一步" :items="['蟄伏期', '進食期', '大吃']" class="bg-primary w-100">
          <template v-slot:item.1>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                羽化後的1~2個月，在堅硬的外殼底下，內部的器官還在發育，此時的成蟲正在沈睡中，不會進食。使用濕水苔或濕衛生紙，在足夠的濕度環境供其靜養即可。<br>
              </v-card-text>
            </v-card>
          </template>
    
          <template v-slot:item.2>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                觀察成蟲開始躁動，即可開始餵食甲蟲專用果凍，或是新鮮水果（須確保無農藥殘留）。1隻甲蟲1飼養箱，在飼養箱內以約1公分深的水苔鋪滿，避免甲蟲翻覆時無法爬起，掙扎耗費體力。保持通風，穩定的飼養溫度和食物，可以讓甲蟲活得更久！<br>
              </v-card-text>
            </v-card>
          </template>
    
          <template v-slot:item.3>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                剛開始進食的甲蟲吃得不多，隨著時間進食份量會逐漸增加，即可進行配種。約進食3個月是彩虹鍬最適合交配的時候，可以準備讓公蟲和母蟲放在一起交配囉！
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
