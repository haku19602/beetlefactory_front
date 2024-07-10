<template>
  <VContainer style="height: 90%;">
    <VRow class="justify-center align-center h-100">
      <VCol cols="12" md="2" class="text-center">
        <VBtn class="bg-secondary2">
          <h2 class="text-primary">幼蟲</h2>
        </VBtn>
      </VCol>

      <VCol cols="12" md="10">
        <v-stepper flat alt-labels prev-text="上一步" next-text="下一步" :items="['卵', '幼蟲', '前蛹', '蛹']" class="bg-primary w-100">
          <template v-slot:item.1>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                <h3 class="mt-3">外觀</h3>彩虹鍬形蟲的卵通常是圓形或橢圓形，顏色從白色到淡黃色不等。它們的表面光滑，略帶光澤。<br>
                <h3 class="mt-3">大小</h3>卵的直徑大約在2到3毫米之間，這使得它們相對較小且難以察覺。<br>
                <h3 class="mt-3">孵化期</h3>在適宜的條件下，彩虹鍬形蟲的卵需要大約1到2個月的時間才能孵化。孵化所需的時間會受到溫度和濕度的影響。<br>
                <h3 class="mt-3">環境要求</h3>卵的孵化需要穩定的溫度和適當的濕度。通常，理想的溫度範圍是25到28攝氏度，濕度需要保持在60%到70%左右。
              </v-card-text>
            </v-card>
          </template>
    
          <template v-slot:item.2>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                <h3 class="mt-3">外觀</h3>彩虹鍬形蟲的幼蟲類似蝦仁呈C字形，身體柔軟飽滿，有三對胸足。幼蟲的顏色通常為白色或乳白色，隨著成長可能會變得稍微黃褐色。<br>
                <h3 class="mt-3">成長階段</h3>幼蟲階段分為三個齡期（instars），每一齡期結束時幼蟲都會蛻皮，逐漸長大。第一齡期的幼蟲很小，但隨著每次蛻皮，它們會變得越來越大。<br>
                <h3 class="mt-3">食物</h3>幼蟲主要以腐殖質為食，包括腐爛的木材和落葉等有機物質。飼養時，可以提供專門飼養甲蟲的發酵木屑，種植香菇的菌瓶也可以當作彩虹鍬形蟲幼蟲的食物。使用菌瓶飼養須注意飼養環境溫度穩定，一般建議25度C以下恆溫控制環境，否則菌瓶會容易變質唷！沒有溫控建議以木屑飼養。使用500~1000cc的容器飼養，約2~3個月（或視進食狀況）更換一次新鮮食材。<br>
                <h3 class="mt-3">環境要求</h3>幼蟲需要一個穩定且濕潤的環境來生長。理想的溫度範圍是20到25攝氏度，濕度需要保持在70%到80%左右，以確保基質不會乾燥。在人工飼養環境中，確保基質的清潔和新鮮是很重要的。此外，避免過度擾動幼蟲，以免影響其正常生長。環境溫度越穩定，幼蟲長得越好唷！
              </v-card-text>
            </v-card>
          </template>
    
          <template v-slot:item.3>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                <h3 class="mt-3">外觀變化</h3>當幼蟲即將進入前蛹階段時，它們會停止進食，身體開始變得更加透明，體內的消化道內容物逐漸清空。<br>
                <h3 class="mt-3">活動減少</h3>幼蟲在前蛹階段的活動量會顯著減少，並開始尋找一個適合化蛹的地方，通常是基質中的一個穩固、安靜的位置。<br>
                <h3 class="mt-3">蛹室構建</h3>幼蟲會用頭部和身體壓實周圍的土壤或基質，構建一個蛹室（pupal chamber），這個蛹室能夠提供保護，防止外界環境對蛹的影響。<br>
                <h3 class="mt-3">蛻皮</h3>進入蛹室後，幼蟲會經歷最後一次蛻皮，這次蛻皮不同於之前的幼蟲蛻皮，它標誌著幼蟲轉變為蛹。這一過程通常需要幾天時間。<br>
                <h3 class="mt-3">靜止狀態</h3>在這段時間內，前蛹基本處於靜止狀態，準備進一步的蛻變過程。前蛹的皮膚會變得更加硬化，以保護即將轉變為蛹的身體。前蛹階段的長短取決於環境條件，通常持續幾天到一週左右。在這段時間內，前蛹不會進食或移動，完全依賴體內儲存的能量進行變化。<br>
                <h3 class="mt-3">環境要求</h3>保持適當的溫度和濕度對於前蛹階段的成功轉變至關重要。溫度應保持在20到25攝氏度之間，濕度應保持在70%到80%左右，避免打擾前蛹。
              </v-card-text>
            </v-card>
          </template>
  
          <template v-slot:item.4>
            <v-card flat class="bg-primary mx-8">
              <v-card-text>
                <h3 class="mt-3">外觀</h3>蛹的形態介於幼蟲和成蟲之間，通常呈現淡黃色或乳白色。可以看到未來成蟲的基本輪廓，包括頭部、胸部和腹部的區分，以及成蟲翅膀和腳的雛形。<br>
                <h3 class="mt-3">蛹室</h3>蛹階段在前蛹所構建的蛹室內度過。蛹室提供了一個相對穩定和安全的環境，保護蛹免受外界環境變化和捕食者的侵害。<br>
                <h3 class="mt-3">蛹化過程</h3>在前蛹蛻皮後，彩虹鍬形蟲進入蛹階段。這一過程通常需要幾天到一週時間。蛹化完成後，蛹會在蛹室內靜止不動。<br>
                <h3 class="mt-3">蛹期</h3>蛹階段的長度取決於環境條件，尤其是溫度和濕度。通常，蛹期需要幾週到幾個月不等。在這段時間內，蛹內部進行劇烈的變化，從內到外逐步形成成蟲的各個結構。<br>
                <h3 class="mt-3">變態</h3>在蛹期內，幼蟲的身體組織會逐漸分解和重新組織，形成成蟲的身體結構。這一過程稱為完全變態（holometabolism），是昆蟲的一種常見發育模式。<br>
                <h3 class="mt-3">羽化</h3>當蛹期結束時，成蟲準備羽化（emergence）。成蟲會從蛹皮中爬出，並且逐漸伸展翅膀和身體。羽化過程中，成蟲的體色會逐漸變得更加鮮豔，並硬化。<br>
                <h3 class="mt-3">環境要求</h3>在蛹期，保持適當的溫度和濕度至關重要。理想的溫度範圍是20到25攝氏度，濕度應保持在70%到80%左右，以確保蛹室內的環境穩定。
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
