<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="comment-group" label-for="comment">
          <b-form-textarea
            id="comment"
            v-model="memo.comment"
            placeholder="댓글 입력..."
            rows="5"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" style="border: 0px; background-color: #426289"
          >댓글 작성</b-button
        >

        <b-button
          type="reset"
          style="border: 0px; background-color: #8999ac; margin-left: 8px"
          >초기화</b-button
        >
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/util/http-common";
import { mapState, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemoWriteForm",
  data() {
    return {
      memo: {
        articleno: 0,
        memono: 0,
        userid: "",
        comment: "",
      },
      isUserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    /*if (this.type === "modify") {
      http.get(`/board/${this.$route.params.articleno}`).then(({ data }) => {
        // this.article.articleno = data.article.articleno;
        // this.article.userid = data.article.userid;
        // this.article.subject = data.article.subject;
        // this.article.content = data.article.content;
        this.article = data;
      });
      this.isUserid = true;
    }*/
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.memo.comment &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.comment.focus());

      if (!err) alert(msg);
      else this.registMemo();
    },
    onReset(event) {
      event.preventDefault();
      this.memo.memono = 0;
      this.memo.comment = "";
    },
    registMemo() {
      http
        .post(`/board/memo/${this.$route.params.articleno}`, {
          userid: this.userInfo.userid,
          comment: this.memo.comment,
          articleno: this.$route.params.articleno,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
            this.$router.go();
          }
          alert(msg);
        });
    },
  },
};
</script>

<style></style>
