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
          마이페이지
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="7">
        <b-jumbotron>
          <!-- <template #header>My Page</template>

          <template #lead> 내 정보 확인페이지입니다. </template> -->

          <!-- <hr class="my-4" /> -->

          <div align="left">
            <b-row style="margin: 10px">
              <b-col cols="3"></b-col>
              <b-col cols="3" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userid }}</b-col
              ><b-col cols="2"></b-col>
            </b-row>
            <b-row style="margin: 10px"
              ><b-col cols="3"></b-col>
              <b-col cols="3" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.username }}</b-col
              ><b-col cols="2"></b-col>
            </b-row>
            <b-row style="margin: 10px"
              ><b-col cols="3"></b-col>
              <b-col cols="3" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.email }}</b-col
              ><b-col cols="2"></b-col>
            </b-row>
            <b-row style="margin: 10px"
              ><b-col cols="3"></b-col>
              <b-col cols="3" align-self="end">가입일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.joindate }}</b-col
              ><b-col cols="2"></b-col>
            </b-row>
          </div>
          <br />
          <hr class="my-4" />
          <br />
          <b-button
            style="border: 0px; background-color: #426289"
            @click="updateInfo"
            >정보수정</b-button
          >
          <b-button
            style="border: 0px; background-color: #8999ac; margin-left: 8px"
            @click="onClickWithdrawal"
            >회원탈퇴</b-button
          >
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
    <br /><br /><br />
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { withdrawal } from "@/api/member";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
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
            this.SET_IS_LOGIN(false);
            this.SET_USER_INFO(null);
            sessionStorage.removeItem("access-token");
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
