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
          게시판
        </p>
      </b-col>
    </b-row>
    <b-row align="left" style="padding: 0 80px">
      <b-col class="text-left">
        <b-button
          style="border: 0px; background-color: #8999ac"
          @click="listArticle"
          >목록</b-button
        >
      </b-col>
      <b-col class="text-right" v-show="canDelete">
        <b-button
          class="mr-2"
          style="border: 0px; background-color: #426289"
          @click="moveModifyArticle"
          >글수정</b-button
        >
        <b-button
          style="border: 0px; background-color: #8999ac"
          @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <br /><br />
    <div align="left" style="padding: 0 80px">
      <b-row>
        <b-col cols="2" align="center"> 글 번호 </b-col>
        <b-col cols="5">{{ article.articleno }}</b-col>
        <b-col cols="2" align="center"> 조회수 </b-col>
        <b-col cols="2">{{ article.hit }}</b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="2" align="center"> 작성자 </b-col>
        <b-col cols="5">{{ article.userid }}</b-col>
        <b-col cols="2" align="center"> 등록일 </b-col>
        <b-col cols="3">{{ article.regtime }}</b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="2" align="center"> 제목 </b-col>
        <b-col cols="10">{{ article.subject }}</b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col
          style="height: 150px; padding: 20px 50px; white-space: pre-line"
          align="center"
          >{{ article.content }}</b-col
        >
      </b-row>
      <hr />
    </div>
    <br />
    <b-row align="left" style="padding: 0 80px">
      <b-col class="text-left">
        <div><strong>댓글(QnA) 목록</strong></div>
      </b-col>
      <b-col class="text-right">
        <b-button
          v-if="!isShowMemo"
          style="border: 0px; background-color: #426289"
          @click="writeMemo"
          >댓글(QnA) 작성 쓰기</b-button
        >
        <b-button
          v-else
          style="border: 0px; background-color: #8999ac"
          @click="writeMemo"
          >댓글(QnA) 작성 취소</b-button
        >
      </b-col>
    </b-row>
    <br />
    <memo-write-form v-if="isShowMemo"></memo-write-form>
    <memo-list-row v-for="(memo, index) in memos" :key="index" v-bind="memo" />
  </b-container>
</template>

<script>
// import moment from "moment";
import http from "@/util/http-common";
import MemoListRow from "@/components/board/child/MemoListRow";
import MemoWriteForm from "@/components/board/child/MemoWriteForm";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  components: {
    MemoListRow,
    MemoWriteForm,
  },
  data() {
    return {
      article: {},
      memos: [],
      isShowMemo: false,
      canDelete: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    message() {
      if (this.article.content) {
        return this.article.content.split("\n").join("<br>");
      }
      return "";
    },
    // changeDateFormat() {
    //   return moment(new Date(this.article.regtime)).format(
    //     "YYYY.MM.DD hh:mm:ss"
    //   );
    // },
  },
  created() {
    http.get(`/board/${this.$route.params.articleno}`).then(({ data }) => {
      this.article = data;
      if (this.article.userid == this.userInfo.userid) {
        this.canDelete = true;
      }
      if (this.userInfo.userid == "admin") {
        this.canDelete = true;
      }
    });
    http.get(`/board/memo/${this.$route.params.articleno}`).then(({ data }) => {
      this.memos = data;
    });
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "BoardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "BoardUpdate",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "BoardDelete",
          params: { articleno: this.article.articleno },
        });
      }
    },
    writeMemo() {
      this.isShowMemo = !this.isShowMemo;
    },
  },
};
</script>

<style></style>
