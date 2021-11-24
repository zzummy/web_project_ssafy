<template>
  <b-row>
    <b-col align="left">
      <b-container
        v-if="houses && houses.length != 0"
        class="bv-example-row mt-3"
      >
        <p style="color: #3b3838">검색결과 : {{ houses.length }}</p>
        <house-list-row
          v-for="(house, index) in slicedhouses"
          :key="index"
          :house="house"
          style="border-bottom: 1px solid #c0c4ca"
        />
        <br /><br />
        <b-col>
          <!-- Pagination 처리 -->
          <!-- <b-pagination
              v-model="currentPage"
              :total-rows="totalrows"
              :per-page="perPage"
              align="center"
              @page-click="pageClick"
            ></b-pagination> -->

          <b-pagination
            v-model="currentPage"
            :total-rows="totalrows"
            :per-page="perPage"
            class="my-0"
            pills
            align="center"
            @page-click="pageClick"
          ></b-pagination>
          <br /><br /><br />
        </b-col>
        <b-col></b-col>
      </b-container>
      <b-container v-else class="bv-example-row mt-3">
        <b-row>
          <b-col><p class="underline">검색된 주택 목록이 없습니다.</p> </b-col>
        </b-row>
      </b-container>
    </b-col>
  </b-row>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
import { mapActions, mapState, mapMutations } from "vuex";
//import HouseMap from "@/components/house/HouseMap.vue";

const houseStore = "houseStore";
//var map;

export default {
  name: "HouseList",

  components: {
    HouseListRow,
  },
  data() {
    return {
      fields: [
        {
          key: "일련번호",
          label: "일련번호",
        },
        {
          key: "아파트",
          label: "아파트",
        },
        {
          key: "거래금액",
          label: "거래금액",
        },
        { key: "actions", label: "상세정보" },
      ],
      slicedhouses: [],
      perPage: 10,
      currentPage: 1,
      totalrows: 0,
    };
  },
  computed: {
    ...mapState(houseStore, ["houses", "sidos", "guguns"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
  created() {
    this.totalrows = this.houses.length;
    this.currentPage = 1;
    this.slicedhouses = this.houses.slice(
      (this.currentPage - 1) * this.perPage,
      this.currentPage * this.perPage
    );
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getHouseList"]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),
    pageClick: function (button, page) {
      this.currentPage = page;
      this.slicedhouses = this.houses.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },
};
</script>

<style>
.underline {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(45, 72, 121, 0.3) 30%
  );
}
#map {
  width: 100%;
  height: 450px;
}
</style>
