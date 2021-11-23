<template>
  <b-row class="mt-4 mb-4 text-center">
    <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
    <b-col cols="3" class="text-center align-self-center">
      <b-form-select
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      ></b-form-select>
    </b-col>
    <b-col cols="3" class="text-center align-self-center">
      <b-form-select
        v-model="gugunCode"
        :options="guguns"
        @change="searchApt()"
      ></b-form-select>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.

  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }  
*/
const houseStore = "houseStore";

export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      //dongCode: null,
      positions: this.$store.positions,
    };
  },
  computed: {
    ...mapState(houseStore, [
      "houses",
      "sidos",
      "guguns",
      "positions",
      // "houses",
      // "map",
      // "ps",
      // "geocoder",
      // "infowindow",
      // "customOverlay",
    ]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getHouseList",
      //"getDong",
      // "detailHouse",
      // "displayMarkers",
      // "addMarker",
      // // //"removeMarker",
      // "getListItem",
      // "displayInfowindow",
      // "removeAllChildNods",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      //"CLEAR_DONG_LIST",
      "CLEAR_DETAIL_HOUSE",
    ]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    // dongList() {
    //   this.CLEAR_DONG_LIST();
    //   this.dongCode = null;
    //   if (this.gugunCode) this.getDong(this.gugunCode);
    // },
    searchApt() {
      this.CLEAR_DETAIL_HOUSE();
      if (this.gugunCode) {
        this.getHouseList(this.gugunCode);
        //this.displayMarkers(this.positions);
      }
    },
    // searchApt() {
    //   this.CLEAR_DETAIL_HOUSE();
    //   if (this.dongCode) {
    //     this.getHouseList(this.dongCode);
    //     this.displayMarkers(this.houses);
    //   }
    // },
  },
};
</script>

<style></style>
