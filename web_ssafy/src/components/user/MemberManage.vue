<template>
  <b-container class="mt-4" v-if="userInfo">
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
          회원관리
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-jumbotron>
          <b-container fluid>
            <b-row align="right"
              ><b-col
                ><b-button
                  size="sm"
                  style="margin-right: 10px"
                  @click="onModify"
                >
                  수정 </b-button
                ><b-button size="sm" @click="onClickWithdrawal">
                  삭제
                </b-button></b-col
              ></b-row
            >
            <br />
            <b-table
              :items="user"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              :select-mode="selectMode"
              responsive="sm"
              ref="selectableTable"
              selectable
              @row-selected="onRowSelected"
              stacked="md"
              small
            >
              <template #cell(actions)="{ rowSelected }">
                <template v-if="rowSelected">
                  <span aria-hidden="true">&check;</span>
                  <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                  <span aria-hidden="true">&nbsp;</span>
                  <span class="sr-only">Not selected</span>
                </template>
              </template>
            </b-table>
            <!-- User Interface controls -->

            <!-- <b-col></b-col> -->
            <br />
            <b-col>
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="center"
                class="my-0"
                pills
                aria-controls="items"
              ></b-pagination>
            </b-col>
          </b-container>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";
import { mapState, mapMutations } from "vuex";
import { withdrawal } from "@/api/member";

const memberStore = "memberStore";

export default {
  name: "MemberManage",
  components: {},
  data() {
    return {
      fields: [
        {
          key: "userid",
          label: "User ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "username",
          label: "User Name",
          sortable: true,
          class: "text-center",
        },
        {
          key: "email",
          label: "User Email",
          sortable: false,
          class: "text-center",
        },
        {
          key: "joindate",
          label: "가입날짜",
          sortable: true,
          class: "text-center",
        },
        { key: "actions", label: "선택" },
      ],
      user: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      selectMode: "single",
      selected: [],
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    if (this.userInfo.userid == "admin") {
      http.get(`/user/list`).then(({ data }) => {
        this.user = data;
        this.totalRows = this.user.length;
      });
    } else {
      alert("관리자만 접근 가능");
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickWithdrawal() {
      if (this.selected.length > 0) {
        let msg = "회원 탈퇴를 완료했습니다";
        withdrawal(
          this.selected[0].userid,
          ({ data }) => {
            if (data === "success") {
              alert(msg);
              this.$router.go();
            } else {
              msg = "회원 탈퇴 오류";
              alert(msg);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        alert("회원을 선택해주세요");
      }
    },
    updateInfo() {
      this.$router.push({ name: "updateInfo" });
    },
    onRowSelected(items) {
      this.selected = items;
    },
    onModify() {
      if (this.selected.length > 0) {
        console.log(this.selected[0]);
        this.$router.push({
          name: "updateInfoAdmin",
          params: this.selected[0],
        });
      } else {
        alert("회원을 선택해주세요");
      }
    },
  },
};
</script>

<style></style>
