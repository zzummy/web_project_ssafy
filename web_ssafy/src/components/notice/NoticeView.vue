<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listNotice">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="isAdmin">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyNotice"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="removeNotice"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${notice.noticeno}.
          ${notice.subject} [${notice.hit}]</h3><div><h6>${notice.userid}</div><div>${notice.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getNotice, deleteNotice } from "@/api/notice";
import { mapState } from "vuex";

const memberStore = "memberStore";
export default {
  data() {
    return {
      notice: {},
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.notice.content)
        return this.notice.content.split("\n").join("<br>");
      return "";
    },
    // changeDateFormat() {
    //   return moment(new Date(this.article.regtime)).format(
    //     "YYYY.MM.DD hh:mm:ss"
    //   );
    // },
  },
  created() {
    getNotice(
      this.$route.params.noticeno,
      (response) => {
        this.notice = response.data;
      },
      (error) => {
        console.log("삭제시 에러발생!!", error);
      }
    );
    if (this.userInfo.userid == "admin") {
      this.isAdmin = true;
    }
  },
  methods: {
    listNotice() {
      this.$router.push({ name: "NoticeList" });
    },
    moveModifyNotice() {
      this.$router.replace({
        name: "NoticeUpdate",
        params: { noticeno: this.notice.noticeno },
      });
      //   this.$router.push({ path: `/notice/modify/${this.notice.noticeno}` });
    },
    removeNotice() {
      if (confirm("정말로 삭제?")) {
        deleteNotice(this.notice.noticeno, () => {
          this.$router.push({ name: "NoticeList" });
        });
      }
    },
  },
};
</script>

<style></style>
