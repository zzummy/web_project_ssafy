<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row class="mt-4 mb-4 text-center">
      <b-col class="sm-3">
        <b-form-select
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList"
        ></b-form-select>
      </b-col>
      <b-col class="sm-3">
        <b-form-select
          v-model="gugunCode"
          :options="guguns"
          @change="searchApt"
        ></b-form-select>
      </b-col>
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
      <b-col>
        <b-button type="button" @click="showHospitalList"
          >코로나 선별 진료소</b-button
        >
      </b-col>
    </b-row>
    <b-row v-if="showHospital">
      <hospital-list
        v-bind:sidoName="sidoName"
        v-bind:gugunName="gugunName"
      ></hospital-list>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import HospitalList from "@/components/hospital/HospitalList.vue";

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
  components: {
    HospitalList,
  },
  data() {
    return {
      sidoCode: null,
      sidoName: null,
      gugunCode: null,
      gugunName: null,
      showHospital: false,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns"]),
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
    ...mapActions(houseStore, ["getSido", "getGugun", "getHouseList"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      this.getSidoName();
      console.log(this.sidoName);
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchApt() {
      this.showHospital = false;
      this.getGugunName();
      console.log(this.gugunName);
      if (this.gugunCode) this.getHouseList(this.gugunCode);
    },
    showHospitalList() {
      if (this.sidoName != null && this.gugunName != null) {
        this.showHospital = !this.showHospital;
      } else {
        alert("지역을 선택하세요");
      }
    },
    getSidoName() {
      this.sidos.forEach((sido) => {
        if (sido.value === this.sidoCode) {
          this.sidoName = sido.text.substring(0, 2);
        }
      });
    },
    getGugunName() {
      this.guguns.forEach((gugun) => {
        if (gugun.value === this.gugunCode) {
          this.gugunName = gugun.text;
        }
      });
    },
  },
};
</script>

<style></style>
