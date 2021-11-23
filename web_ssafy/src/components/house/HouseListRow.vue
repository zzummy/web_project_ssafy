<template>
  <!-- <router-link :to="{ name: 'HouseDetail' }"> -->
  <b-row
    class="m-2"
    @click="selectHouse"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col cols="10" class="align-self-center" style="padding: 10px">
      <p style="font-size: 12px">{{ house.일련번호 }}</p>
      <span style="font-weight: bold" class="underline">{{
        house.아파트
      }}</span>
      <span style="font-size: 12px"> ({{ house.층 }}층)</span> <br />
      거래금액 : {{ house.거래금액 }}
    </b-col>
  </b-row>
  <!-- </router-link> -->
</template>

<script>
import { mapActions, mapMutations } from "vuex";
//import HouseDetail from "@/components/house/HouseDetail.vue";

const houseStore = "houseStore";

export default {
  name: "HouseListRow",
  // components: {
  //   HouseDetail,
  // },
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    house: Object,
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse"]),
    ...mapMutations(houseStore, ["CLEAR_DETAIL_HOUSE"]),

    selectHouse() {
      console.log("listRow : ", this.house);
      // this.$store.dispatch("getHouse", this.house);
      this.detailHouse(this.house);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: #c0c4ca;
}
.underline {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(45, 72, 121, 0.3) 30%
  );
}
</style>
