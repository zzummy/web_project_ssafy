<template>
    <div class="mainhead" v-bind:style="{ 'background-image': 'url(' + img + ')' }"> 
      <div>
        <p class="text-center text-capitalize fs-1 fw-bold">Happyhouse</p>
        <p class="text-center fs-3 fw-bold">안녕하세요</p>
      </div>
    </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
      name:'mainhead',
      data() {
        return {
          img: ref(require('@/assets/images/main_house.jpg')),
        }
      },
      setup(){
    }
  }
</script>

<style scoped>
.mainhead {
  height: 600px;
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
