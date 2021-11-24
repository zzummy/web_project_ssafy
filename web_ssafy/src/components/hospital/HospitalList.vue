<template>
  <b-container fluid>
    <div>
      <h3>코로나 선별 진료소</h3>
    </div>
    <b-table
      :items="hospitals"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      small
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
    </b-table>
    <!-- User Interface controls -->
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
        ></b-pagination>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "HospitalList",
  props: {
    sidoName: String,
    gugunName: String,
  },
  data() {
    return {
      hospitals: [],
      fields: [
        {
          key: "hospitalName",
          label: "진료소명",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "address",
          label: "주소",
          sortable: false,
          class: "text-center",
        },
        {
          key: "phonenumber",
          label: "연락처",
          sortable: false,
          class: "text-center",
        },
        { key: "actions", label: "상세정보" },
      ],
      details: [
        {
          key: "optimeWeekday",
          label: "평일 운영시간",
        },
        {
          key: "optimeSat",
          label: "토요일 운영시간",
        },
        {
          key: "optimeSun",
          label: "일요일/공휴일 운영시간",
        },
        {
          key: "etc",
          label: "기타사항",
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 3,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
    };
  },
  created() {
    http
      .post(`/hospital/list`, {
        sidoName: this.sidoName,
        gugunName: this.gugunName,
      })
      .then(({ data }) => {
        if (data != null) {
          this.hospitals = data;
          this.totalRows = this.hospitals.length;
        }
      });
  },
};
</script>
