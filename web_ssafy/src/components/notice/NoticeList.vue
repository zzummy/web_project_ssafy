<template>
  <b-container class="bv-example-row mt-3">
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
          공지사항
        </p>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-form-select
          class="mr-2"
          v-model="key"
          size="ms"
          id="select"
          :options="options"
        ></b-form-select>
        <input
          type="text"
          id="word"
          @keyup.enter="searchNotice()"
          class="mr-2"
          v-model="word"
        />
        <b-button
          @click="searchNotice()"
          class="mr-2"
          style="border: 0px; background-color: #426289"
          >검색
        </b-button>
        <b-button
          @click="moveWrite()"
          v-if="isAdmin"
          style="border: 0px; background-color: #8999ac"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col v-if="notices.length">
        <b-table-simple hover responsive id="items">
          <b-thead style="background-color: #f2f4f8">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <notice-list-row
              v-for="(notice, index) in slicednotices"
              :key="index"
              v-bind="notice"
            />
          </tbody>
        </b-table-simple>
      </b-col>
      <b-col v-else class="text-center">공지사항이 없습니다.</b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col>
        <!-- Pagination 처리 -->
        <!-- <b-pagination
          v-model="currentPage"
          :total-rows="totalrows"
          :per-page="perPage"
          aria-controls="items"
          align="center"
          @page-click="pageClick"
        ></b-pagination> -->
        <br /><br />
        <b-pagination
          v-model="currentPage"
          :total-rows="totalrows"
          :per-page="perPage"
          pills
          aria-controls="items"
          align="center"
          @page-click="pageClick"
        ></b-pagination>
        <br /><br />
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import NoticeListRow from "@/components/notice/child/NoticeListRow";
import { listNotice, listNoticeAll } from "@/api/notice.js";
//import axios from "axios";
import http from "@/util/http-common";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "NoticeList",
  components: {
    NoticeListRow,
  },
  data() {
    return {
      // 검색
      key: null,
      options: [
        { value: null, text: "선택" },
        { value: "subject", text: "제목" },
        { value: "content", text: "내용" },
      ],
      word: "",
      notices: [],
      slicednotices: [],
      isAdmin: false,
      perPage: 5,
      currentPage: 1,
      totalrows: 0,
      //items: this.notices,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    listNoticeAll(
      (response) => {
        this.notices = response.data;
        this.totalrows = this.notices.length;
        this.slicednotices = this.notices.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        );
      },
      (error) => {
        console.log(error);
      }
    );
    if (this.userInfo.userid == "admin") {
      this.isAdmin = true;
    }
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "NoticeWrite" });
    },
    // 검색
    searchNotice() {
      http
        .get(
          `http://localhost:9999/vue/notice?key=${this.key}&word=${this.word}`
        )
        .then(({ data }) => {
          console.log(data);
          let param = {
            pg: this.pg,
            spp: this.spp,
            // pg: 1,
            // spp: 10,
            key: this.key,
            word: this.word,
          };
          listNotice(
            param,
            (response) => {
              this.notices = response.data;
              this.totalrows = this.notices.length;
              this.currentPage = 1;
              this.slicednotices = this.notices.slice(
                (this.currentPage - 1) * this.perPage,
                this.currentPage * this.perPage
              );
            },
            (error) => {
              console.log(error);
            }
          );
        });
    },
    pageClick: function (button, page) {
      this.currentPage = page;
      this.slicednotices = this.notices.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
#select {
  width: 100px;
}
input {
  vertical-align: middle;
  height: 35px;
}
</style>
