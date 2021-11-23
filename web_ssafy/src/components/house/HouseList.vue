<template>
  <b-row>
    <b-col cols="4" align="left">
      <b-container
        v-if="houses && houses.length != 0"
        class="bv-example-row mt-3"
      >
        <p style="color: #3b3838">검색결과 : {{ houses.length }}</p>
        <house-list-row
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
          style="border-bottom: 1px solid #c0c4ca"
        />
      </b-container>
      <b-container v-else class="bv-example-row mt-3">
        <b-row>
          <b-col><p class="underline">검색된 주택 목록이 없습니다.</p> </b-col>
        </b-row>
      </b-container>
    </b-col>
    <b-col cols="8"> <house-map /></b-col>
  </b-row>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
import { mapActions, mapState } from "vuex";
import HouseMap from "@/components/house/HouseMap.vue";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListRow,
    HouseMap,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },

  methods: {
    ...mapActions(houseStore, ["getHouseList"]),
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
</style>
