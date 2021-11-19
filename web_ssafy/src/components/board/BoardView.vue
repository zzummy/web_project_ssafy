<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listArticle">목록</b-button>
      </b-col>
      <b-col class="text-right" v-show="canDelete">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleno}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`"
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
    <b-row class="mb-1">
      <b-col class="text-left">
        <div><strong>댓글(QnA) 목록</strong></div>
      </b-col>
      <b-col class="text-right">
        <b-button
          v-if="!isShowMemo"
          variant="outline-info"
          size="sm"
          @click="writeMemo"
          >댓글(QnA) 작성 쓰기</b-button
        >
        <b-button v-else variant="outline-info" size="sm" @click="writeMemo"
          >댓글(QnA) 작성 취소</b-button
        >
      </b-col>
    </b-row>
    <memo-write-form v-if="isShowMemo"></memo-write-form>
    <memo-list-row v-for="(memo, index) in memos" :key="index" v-bind="memo" />
    <div v-for="(memo, index) in memos" :key="index">{{ memo.memoid }}</div>
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
