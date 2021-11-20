<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-col cols="5">
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="5">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group label="아이디" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.userid"
                required
                placeholder="User ID"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                required
                placeholder="User Password"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="비밀번호 확인"
              label-for="userpwdcheck"
              style="margin-bottom: 0px"
            >
              <b-form-input
                type="password"
                id="userpwdcheck"
                v-model="userpwdcheck"
                required
                placeholder="Check User Password"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <p v-show="wrongPwd" style="color: red; font-size: 10px">
              &nbsp;비밀번호가 일치하지 않습니다.
            </p>
            <b-form-group
              label="이메일"
              label-for="email"
              style="margin-top: 1rem"
            >
              <b-form-input
                type="email"
                id="email"
                v-model="user.email"
                required
                placeholder="User Email"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <br />
            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="confirm"
              >회원가입</b-button
            >
            <b-button
              type="button"
              variant="danger"
              class="m-1"
              @click="onReset"
              >초기화</b-button
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
  name: "MemberJoin",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
        email: null,
      },
      userpwdcheck: null,
      wrongPwd: false,
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
    onReset(event) {
      event.preventDefault();
      this.user.userid = null;
      this.user.userpwd = null;
      this.userpwdcheck = null;
      this.user.email = null;
    },
  },
  updated() {
    if (this.user.userpwd != this.userpwdcheck) {
      this.wrongPwd = true;
    } else {
      this.wrongPwd = false;
    }
  },
};
</script>

<style></style>
