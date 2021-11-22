<template>
  <b-container class="bv-example-row mt-3">
    <!-- <b-row>
      <b-col></b-col>
      <b-col cols="5">
        <b-alert variant="secondary" show><h3>로그인</h3></b-alert>
      </b-col>
      <b-col></b-col>
    </b-row> -->
    <b-row>
      <b-col></b-col>
      <b-col cols="5" style="margin-top: 100px">
        <b-card
          class="text-center"
          style="max-width: 40rem; padding: 20px"
          align="left"
        >
          <p
            style="
              text-align: left;
              font-weight: bold;
              color: #426289;
              font-size: 25px;
            "
          >
            로그인
          </p>
          <br />
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <br />
            <b-form-group label="아이디" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.userid"
                required
                placeholder="User ID"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <br />
            <b-form-group label="비밀번호" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                required
                placeholder="Password"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <br /><br />
            <b-button type="button" class="m-1" @click="confirm" id="loginBtn"
              >로그인</b-button
            >
            <b-button type="button" class="m-1" @click="movePage" id="joinBtn"
              >회원가입</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "Home" });
      }
    },
    movePage() {
      this.$router.push({ name: "SignUp" });
    },
  },
};
</script>

<style>
#loginBtn {
  border: 0px;
  background-color: #426289;
}
#joinBtn {
  border: 0px;
  background-color: #8999ac;
}
</style>
