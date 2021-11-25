<template>
  <!-- <router-link :to="{ name: 'HouseDetail' }"> -->
  <b-row
    class="m-2"
    @click="selectHouse"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col align="left" style="margin: 10px 0px">
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
import { mapState, mapActions, mapMutations } from "vuex";
import http from "@/util/http-common";
//import HouseDetail from "@/components/house/HouseDetail.vue";

const houseStore = "houseStore";
const memberStore = "memberStore";

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
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse"]),
    ...mapMutations(houseStore, ["CLEAR_DETAIL_HOUSE"]),

    selectHouse() {
      console.log("listRow : ", this.house);
      // this.$store.dispatch("getHouse", this.house);
      var housedongcode =
        String(this.house.법정동시군구코드) +
        String(this.house.법정동읍면동코드);
      console.log("house dongcode : ", housedongcode);
      console.log(this.userInfo.userid);
      this.detailHouse(this.house);
      if (this.isLogin) {
        http
          .post(`/user/interest/register`, {
            userid: this.userInfo.userid,
            dongcode: housedongcode,
            hit: 0,
          })
          .then(({ data }) => {
            var msg = "조회 + 1 실패";
            if (data === "success") {
              msg = "조회 + 1 성공";
            }
            console.log(msg);
          });
      }
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
