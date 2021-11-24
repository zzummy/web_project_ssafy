<template>
  <b-container v-if="house" class="bv-example-row" align="left">
    <br /><br />
    <b-icon icon="search" scale="1.5"> </b-icon>
    <span
      style="
        font-weight: bold;
        font-size: 23px;
        color: #3b3838;
        margin: 0px 8px;
      "
    >
      상세보기
    </span>
    <hr style="color: #c0c4ca" />
    <b-container id="cont">
      <b-row>
        <b-col cols="2"> 일련번호 </b-col>
        <b-col cols="8">
          {{ house.일련번호 }}
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="2"> 아파트명 </b-col>
        <b-col cols="10">
          {{ house.아파트 }}
        </b-col>
      </b-row>
      <b-row
        ><b-col cols="2"> 층 수 </b-col>
        <b-col cols="2">
          {{ house.층 }}
        </b-col></b-row
      >
      <b-row
        ><b-col cols="2"> 건축년도 </b-col>
        <b-col cols="2"> {{ house.건축년도 }} </b-col></b-row
      >
      <b-row
        ><b-col cols="2"> 전용면적 </b-col>
        <b-col cols="2"> {{ house.전용면적 }}㎡</b-col></b-row
      >

      <b-row>
        <b-col cols="2"> 거래금액 </b-col>
        <b-col cols="8">
          {{ (parseInt(house.거래금액.replace(",", "")) * 10000) | price }} 원
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseDetail",

  computed: {
    ...mapState(houseStore, ["house"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style>
#cont {
  padding: 10px;
}
</style>
