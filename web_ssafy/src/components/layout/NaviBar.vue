<template>
  <div id="nav1">
    <b-navbar toggleable="lg">
      <b-navbar-brand href="#">
        <router-link to="/">
          <img
            src="@/assets/logo2.png"
            class="d-inline-block align-middle"
            width="110px"
            alt="Kitten"
          />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#"
            ><router-link :to="{ name: 'Home' }" class="link"
              ><b-icon icon="house" font-scale="1"></b-icon> HOME</router-link
            ></b-nav-item
          > -->
          <b-nav-item href="#"
            ><router-link :to="{ name: 'NoticeList' }" class="link"
              ><b-icon icon="bell" font-scale="1"></b-icon>
              공지사항</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'BoardList' }" class="link"
              ><b-icon icon="chat-square-dots" font-scale="1"></b-icon>
              게시판</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'House' }" class="link"
              ><b-icon icon="house-door" font-scale="1"></b-icon>
              아파트정보</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center"
            ><span style="font-weight: bold; color: #426289" class="underline"
              >{{ userInfo.username }}({{ userInfo.userid }})</span
            >님 환영합니다. <b-icon icon="suit-heart-fill"></b-icon
          ></b-nav-item>
          <b-nav-item class="align-self-center" v-if="isAdmin"
            ><router-link
              :to="{ name: 'Manage' }"
              class="link align-self-center"
              >회원관리</router-link
            ></b-nav-item
          >
          <b-nav-item class="align-self-center"
            ><router-link
              :to="{ name: 'MyPage' }"
              class="link align-self-center"
              >내정보보기</router-link
            ></b-nav-item
          >
          <b-nav-item
            class="link align-self-center"
            @click.prevent="onClickLogout"
            >로그아웃</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item href="#"
            ><router-link :to="{ name: 'SignUp' }" class="link"
              ><b-icon icon="person-circle"></b-icon> 회원가입</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'SignIn' }" class="link"
              ><b-icon icon="key"></b-icon> 로그인</router-link
            ></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "NaviBar",
  data() {
    return {
      isAdmin: true,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
  },
  updated() {
    if (this.userInfo.userid === "admin") {
      this.isAdmin = true;
    } else this.isAdmin = false;
  },
};
</script>

<style>
#nav1 {
  align-items: center;
  padding: 10px 300px;
  border-bottom: 1px solid #c0c4ca;
}
.link {
  color: #426289;
  font-weight: bold;
}
.underline {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(45, 72, 121, 0.3) 30%
  );
}
</style>
