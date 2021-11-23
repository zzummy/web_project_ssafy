<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="한번에 보이는 줄 수"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

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
    </b-row>

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
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card class="text-left">
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>
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
      totalRows: 1,
      currentPage: 1,
      perPage: 3,
      pageOptions: [3, 5, 10],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
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
          console.log(this.hospitals);
        }
      });
    this.totalRows = this.hospitals.length;
  },
};
</script>
