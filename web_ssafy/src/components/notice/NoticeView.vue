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
    <b-row align="left" style="padding: 0 80px">
      <b-col class="text-left">
        <b-button
          @click="listNotice"
          style="border: 0px; background-color: #8999ac"
          >목록</b-button
        >
      </b-col>
      <b-col class="text-right" v-if="isAdmin">
        <b-button
          @click="moveModifyNotice"
          class="mr-2"
          style="border: 0px; background-color: #426289"
          >글수정</b-button
        >
        <b-button
          @click="removeNotice"
          style="border: 0px; background-color: #8999ac"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <br />
    <br />
    <div align="left" style="padding: 0 80px">
      <b-row>
        <b-col cols="2" align="center"> 글 번호 </b-col>
        <b-col cols="5">{{ notice.noticeno }}</b-col>
        <b-col cols="2" align="center"> 조회수 </b-col>
        <b-col cols="2">{{ notice.hit }}</b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="2" align="center"> 작성자 </b-col>
        <b-col cols="5">{{ notice.userid }}</b-col>
        <b-col cols="2" align="center"> 등록일 </b-col>
        <b-col cols="3">{{ notice.regtime }}</b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="2" align="center"> 제목 </b-col>
        <b-col cols="10">{{ notice.subject }}</b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col
          style="padding: 20px 50px; white-space: pre-line"
          align="center"
          >{{ notice.content }}</b-col
        >
      </b-row>
      <hr />
    </div>
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
