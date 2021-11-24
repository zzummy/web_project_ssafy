<template>
  <b-container class="bv-example-row mt-3 text-center" id="container">
    <img
      src="@/assets/house1.jpg"
      class="d-inline-block align-middle"
      width="100%"
      alt="Kitten"
      id="bg"
    />
    <b-jumbotron
      id="mainText"
      style="opacity: 0.8"
      header="HappyHouse"
      lead="마음에 드는 집을 사는 그날까지"
    >
      <p>We always be with you</p>
    </b-jumbotron>
    <b-jumbotron header="ㅇㅇㅇ">
      <p>우앵~~~~~~~~~~</p>
      <p>우앵~~~~~~~~~~</p>
      <p>우앵~~~~~~~~~~</p>
      <p>우앵~~~~~~~~~~</p>
      <p>우앵~~~~~~~~~~</p>
    </b-jumbotron>
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
  z-index: 1;
  position: absolute;
  top: 118px;
  left: 0;
  width: 100%;
  height: 500px;
  min-height: 400px;
}
#mainText {
  z-index: 2;
  margin-top: 100px;
  position: relative;
}
</style>
