<template>
  <div align="left" style="padding: 0 80px">
    <!-- <b-col>
      <b-card class="mb-2" border-variant="dark" no-body>
        <template #header>
          <h6 class="text-left">
            <div style="float: left">{{ userid }} ( {{ memotime }} )</div>
            <div
              v-show="canDelete"
              v-b-hover="handleHover"
              style="float: right"
            >
              <b-icon
                v-if="isHovered"
                icon="x-square-fill"
                style="width: 15px; height: 15px; cursor: pointer"
                @click="deleteMemo"
              >
              </b-icon>
              <b-icon v-else icon="x-square" style="width: 15px; height: 15px">
              </b-icon>
            </div>
          </h6>
        </template>
        <b-card-body class="text-left">
          {{ comment }}
        </b-card-body>
      </b-card>
    </b-col> -->

    <b-row>
      <b-col cols="3">
        <b-icon icon="people-fill"></b-icon>&nbsp;&nbsp; {{ userid }}</b-col
      >
      <b-col cols="8" style="padding: 0px 20px">{{ comment }}</b-col>
      <div v-show="canDelete" v-b-hover="handleHover" style="float: right">
        <b-icon
          v-if="isHovered"
          icon="trash-fill"
          font-scale="3"
          style="width: 15px; height: 15px; cursor: pointer"
          @click="deleteMemo"
        >
        </b-icon>
        <b-icon
          v-else
          icon="trash"
          font-scale="3"
          style="width: 15px; height: 15px"
        >
        </b-icon>
      </div>
    </b-row>
    <b-row>
      <b-col cols="3"> </b-col>
      <b-col cols="5" style="color: #8c8c8c"> {{ memotime }}</b-col>
    </b-row>
    <br />

    <hr />
  </div>
</template>
<script>
// import moment from "moment";
import http from "@/util/http-common";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemoListRow",
  props: {
    memono: Number,
    userid: String,
    comment: String,
    memotime: String,
    articleno: Number,
  },
  data() {
    return {
      canDelate: false,
      isHovered: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    // changeDateFormat() {
    //   return moment(new Date(this.regtime)).format("YY.MM.DD hh:mm:ss");
    // },
  },
  created() {
    if (
      this.userid == this.userInfo.userid ||
      this.userInfo.userid == "admin"
    ) {
      this.canDelete = true;
    }
  },
  methods: {
    deleteMemo() {
      if (confirm("해당 댓글을 삭제하겠습니까?")) {
        http.delete(`/board/memo/delete/${this.memono}`).then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          // 새로고침
          this.$router.go();
        });
      }
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    },
  },
};
</script>

<style></style>
