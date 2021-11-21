<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
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
        <b-button variant="outline-info" @click="searchNotice()" class="mr-2"
          >검색
        </b-button>
        <b-button variant="outline-primary" @click="moveWrite()" v-if="isAdmin"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="notices.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
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
              v-for="(notice, index) in notices"
              :key="index"
              v-bind="notice"
            />
          </tbody>
        </b-table-simple>
      </b-col>
      <b-col v-else class="text-center">공지사항이 없습니다.</b-col>
    </b-row>
  </b-container>
</template>

<script>
import NoticeListRow from "@/components/notice/child/NoticeListRow";
import { listNotice } from "@/api/notice.js";
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
      isAdmin: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: this.key,
      word: this.word,
    };
    listNotice(
      param,
      (response) => {
        this.notices = response.data;
        //console.log("k , w " + this.key + this.word);
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
          // let msg = "검색 처리시 문제가 발생했습니다.";
          // if (data === "success") {
          //   msg = "검색이 완료되었습니다.";
          //   this.notices = data;
          //   this.$router.push({ name: "NoticeListRow", params: this.notices });
          // }
          // alert(msg);
          let param = {
            pg: 1,
            spp: 20,
            key: this.key,
            word: this.word,
          };
          listNotice(
            param,
            (response) => {
              this.notices = response.data;
            },
            (error) => {
              console.log(error);
            }
          );
        });
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
