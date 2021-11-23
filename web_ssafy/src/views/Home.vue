<template>
  <b-container class="bv-example-row mt-3 text-center" id="container">
    <img
      src="@/assets/house1.jpg"
      style="opacity: 0.8"
      class="d-inline-block align-middle"
      width="100%"
      alt="Kitten"
      id="bg"
    />
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <!-- <b-jumbotron
          bg-variant="muted"
          text-variant="dark"
          border-variant="dark"
        >
          <template #header>SSAFY Home</template>

          <template #lead>
            슬기로운 싸피 생활 (:6기편) <br />
            열정 하~~~~앗 Six!!!!!
          </template>

          <hr class="my-4" />

          <p>Vue + Bootstrap활용.</p>
          <p>Bootstrap-vue는 버전 <b>4.5.3</b>을 권장합니다.</p>
          <p><b>BoardList.vue</b>를 바꿔가면서 테스트하세요.</p>
          <p>Bootstrap의 <b>table</b> 사용법을 익히게됩니다.</p>
        </b-jumbotron> -->
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Main",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
#bg {
  position: absolute;
  top: 118px;
  left: 0;
  min-width: 100%;
  height: 70%;
}
</style>
