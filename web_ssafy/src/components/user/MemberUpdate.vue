<template>
  <b-container class="bv-example-row mt-3">
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
            회원정보 수정
          </p>
          <br />
          <b-form class="text-left" @submit="onSubmit" @reset="onReset">
            <b-form-group label="아이디" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.userid"
                required
                placeholder="User ID"
                readonly
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="이름" label-for="username">
              <b-form-input
                id="username"
                v-model="user.username"
                required
                placeholder="User Name"
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
            <b-button type="submit" class="m-1" id="joinBtn">회원수정</b-button>
            <b-button type="reset" class="m-1" id="resetBtn">초기화</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberUpdate",
  data() {
    return {
      user: {
        userid: null,
        username: null,
        userpwd: null,
        email: null,
      },
      userpwdcheck: null,
      wrongPwd: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, [
      "userConfirm",
      "getUserInfo",
      "SET_USER_INFO",
      "SET_IS_LOGIN",
    ]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "MyPage" });
      }
    },
    onSubmit(event) {
      event.preventDefault();
      let err = true;
      let msg = "";
      !this.user.userid &&
        ((msg = "ID를 입력해주세요"), (err = false), this.$refs.userid.focus());
      err &&
        !this.user.username &&
        ((msg = "이름을 입력해주세요"),
        (err = false),
        this.$refs.username.focus());
      err &&
        !this.user.userpwd &&
        ((msg = "비밀번호를 입력해주세요"),
        (err = false),
        this.$refs.userpwd.focus());
      err &&
        this.wrongPwd &&
        ((msg = "비밀번호가 일치하지 않습니다"),
        (err = false),
        this.$refs.userpwdcheck.focus());
      err &&
        !this.user.email &&
        ((msg = "이메일을 입력해주세요"),
        (err = false),
        this.$refs.email.focus());

      if (!err) alert(msg);
      else this.updateMember();
    },
    onReset(event) {
      event.preventDefault();
      this.user.username = this.userInfo.username;
      this.user.userpwd = null;
      this.userpwdcheck = null;
      this.user.email = this.userInfo.email;
    },
    updateMember() {
      http
        .post(`/user/update`, {
          userid: this.user.userid,
          username: this.user.username,
          userpwd: this.user.userpwd,
          email: this.user.email,
        })
        .then(({ data }) => {
          let msg = "회원 정보 수정 처리시 문제가 발생했습니다.";
          console.log(data);
          if (data === "success") {
            msg = "회원 정보 수정이 완료되었습니다.";
            this.SET_IS_LOGIN(false);
            this.SET_USER_INFO(null);
            sessionStorage.removeItem("access-token");
            this.confirm();
          }
          alert(msg);
        });
    },
  },
  created() {
    this.user.userid = this.userInfo.userid;
    this.user.username = this.userInfo.username;
    this.user.userpwd = null;
    this.user.email = this.userInfo.email;
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

<style>
#joinBtn {
  border: 0px;
  background-color: #426289;
}
#resetBtn {
  border: 0px;
  background-color: #8999ac;
}
</style>
