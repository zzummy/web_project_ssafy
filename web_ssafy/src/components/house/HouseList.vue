<template>
  <b-row>
    <b-col cols="5" align="left">
      <b-container
        v-if="houses && houses.length != 0"
        class="bv-example-row mt-3"
      >
        <p style="color: #3b3838">검색결과 : {{ houses.length }}</p>
        <b-table
          :items="houses"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          stacked
          id="housedetail"
        >
          <template #cell(name)="row">
            {{ row.value.first }} {{ row.value.last }}
          </template>
          <template #cell(actions)="row">
            <b-button size="sm" @click="row.toggleDetails">
              상세정보 {{ row.detailsShowing ? "숨기기" : "보기" }}
            </b-button>
          </template>
          <template #row-details="row">
            <b-card class="text-left">
              <li>평일 운영시간 : {{ row.item.optimeWeekday }}</li>
              <li>토요일 운영시간 : {{ row.item.optimeSat }}</li>
              <li>일요일/공휴일 운영시간 : {{ row.item.optimeSun }}</li>
              <li>기타사항 : {{ row.item.etc }}</li>
            </b-card>
          </template>
          <house-list-row
            :house="row"
            style="border-bottom: 1px solid #c0c4ca"
          />
        </b-table>
        <!-- pagination -->
        <b-row>
          <b-col></b-col>
          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
              aria-controls="housedetail"
            ></b-pagination>
          </b-col>
          <b-col></b-col>
        </b-row>
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
import { mapActions, mapState } from "vuex";

const houseStore = "houseStore";

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
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
  updated() {
    this.totalRows = this.houses.length;
    console.log(this.totalRows);
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
