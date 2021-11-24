<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <b-col>
        <p
          style="
            font-weight: bold;
            font-size: 2em;
            color: #3b3838;
            margin: 80px 0px;
          "
        >
          아파트 정보
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <house-search-bar></house-search-bar>
      </b-col>
    </b-row>
    <!-- <b-row>
      <b-col cols="12" align="left">
        <house-list />
      </b-col>
      <b-col cols="8">

        <div><house-detail /></div>
      </b-col>
    </b-row> -->
  </b-container>
</template>
<script>
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
//import HouseList from "@/components/house/HouseList.vue";
//import HouseDetail from "@/components/house/HouseDetail.vue";
//import HospitalList from "@/components/hospital/HospitalList.vue";

export default {
  name: "House",
  components: {
    HouseSearchBar,
    // HouseList,
    // HouseDetail,
    //HospitalList,
  },
};
</script>
<style scoped></style>
