<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <p
          style="
            font-weight: bold;
            font-size: 2em;
            color: #3b3838;
            margin: 40px 0px;
          "
        >
          회원관리
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <div><h4>회원 목록</h4></div>
          <div>
            <h4>{{ userInfo.userid }}</h4>
            <h4>{{ userInfo.userpwd }}</h4>
            <h4>{{ userInfo.email }}</h4>
            <h4>{{ userInfo.username }}</h4>
          </div>
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
      user: [],
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    if (this.userInfo.userid == "admin") {
      http.get(`/user/list`).then(({ data }) => {
        this.user = data;
      });
    } else {
      alert("관리자만 접근 가능");
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickWithdrawal() {
      let msg = "회원 탈퇴를 완료했습니다";
      withdrawal(
        this.userInfo.userid,
        ({ data }) => {
          if (data === "success") {
            alert(msg);
            this.$router.push({ name: "Home" });
          } else {
            msg = "회원 탈퇴 오류";
            alert(msg);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    updateInfo() {
      this.$router.push({ name: "updateInfo" });
    },
  },
};
</script>

<style></style>
