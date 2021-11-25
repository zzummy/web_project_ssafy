<template>
  <b-container class="bv-example-row mt-3 text-center" id="container">
    <img
      src="@/assets/house1.jpg"
      class="d-inline-block align-middle"
      width="100%"
      alt="Kitten"
      id="bg"
    />
    <b-jumbotron id="mainText" style="opacity: 0.8">
      <br />
      <template #header
        ><span
          ><b-icon icon="house-door-fill"></b-icon> Happy House</span
        ></template
      >
      <h4>마음에 드는 집을 사는 그 날까지</h4>
      <h5 class="underline">We always be with you</h5>
    </b-jumbotron>
    <br /><br /><br /><br /><br /><br />
    <div v-if="showHotLoc" :style="styleObject">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="576"
        style="text-shadow: 1px 1px 2px #333; opacity: 0.7"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide :img-src="require(`@/assets/slidehouse1.jpg`)">
          <h1>인기 지역 순위 1</h1>
          <br />
          <h5>{{ hotloc[0].sidoName + " " + hotloc[0].gugunName }}</h5>
          <h3>{{ hotloc[0].dongName }}</h3>
          <br />
        </b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide :img-src="require(`@/assets/slidehouse2.jpg`)">
          <h1>인기 지역 순위 2</h1>
          <br />
          <h5>{{ hotloc[1].sidoName + " " + hotloc[1].gugunName }}</h5>
          <h3>{{ hotloc[1].dongName }}</h3>
          <br />
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide :img-src="require(`@/assets/slidehouse3.jpg`)">
          <h1>인기 지역 순위 3</h1>
          <br />
          <h5>{{ hotloc[2].sidoName + " " + hotloc[2].gugunName }}</h5>
          <h3>{{ hotloc[2].dongName }}</h3>
          <br />
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div v-if="showUserLoc" style="width: 48%; float: right">
      <b-carousel
        id="carousel-1"
        v-model="slide1"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="576"
        style="text-shadow: 1px 1px 2px #333; opacity: 0.7"
        @sliding-start="onSlideStart1"
        @sliding-end="onSlideEnd1"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          v-if="userloc.length > 0"
          :img-src="require(`@/assets/slidehouse4.jpg`)"
          ><h1>내가 찾아 본 지역 1</h1>
          <br />
          <h5>{{ userloc[0].sidoName + " " + userloc[0].gugunName }}</h5>
          <h3>{{ userloc[0].dongName }}</h3>
          <br
        /></b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide
          v-if="userloc.length > 1"
          :img-src="require(`@/assets/slidehouse5.jpg`)"
        >
          <h1>내가 찾아 본 지역 2</h1>
          <br />
          <h5>{{ userloc[1].sidoName + " " + userloc[1].gugunName }}</h5>
          <h3>{{ userloc[1].dongName }}</h3>
          <br />
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide
          v-if="userloc.length > 2"
          :img-src="require(`@/assets/slidehouse6.jpg`)"
          ><h1>내가 찾아 본 지역 3</h1>
          <br />
          <h5>{{ userloc[2].sidoName + " " + userloc[2].gugunName }}</h5>
          <h3>{{ userloc[2].dongName }}</h3>
          <br
        /></b-carousel-slide>
      </b-carousel>
    </div>
    <div style="clear: both"></div>
    <br />
  </b-container>
</template>

<script>
import http from "@/util/http-common";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "Main",
  data() {
    return {
      hotloc: [],
      userloc: [],
      showHotLoc: false,
      showUserLoc: false,
      slide: 0,
      sliding: null,
      slide1: 0,
      sliding1: null,
      styleObject: {
        width: "48%",
        float: "center",
        margin: "auto",
      },
    };
  },
  props: {
    msg: String,
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  created() {
    http.get(`/user/interest/top`).then(({ data }) => {
      console.log(data);
      this.hotloc = data;
      this.showHotLoc = true;
      if (this.isLogin) {
        http
          .post(`/user/interest/list`, {
            userid: this.userInfo.userid,
            dongcode: "",
            hit: 0,
          })
          .then(({ data }) => {
            console.log(data);
            this.userloc = data;
            if (this.userloc.length > 0) {
              this.showUserLoc = true;
              this.styleObject.float = "left";
            }
          });
      }
    });
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    onSlideStart1() {
      this.sliding1 = true;
    },
    onSlideEnd1() {
      this.sliding1 = false;
    },
  },
};
</script>

<style scoped>
#bg {
  z-index: 1;
  position: absolute;
  top: 118px;
  left: 0;
  width: 100%;
  height: 500px;
  min-height: 400px;
}
#mainText {
  z-index: 2;
  margin-top: 100px;
  position: relative;
  font-family: IBMPlexSansKR-Bold;
}
#carousel-1 {
  text-shadow: 3px 3px 4px black !important;
}
.underline {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(45, 72, 121, 0.3) 30%
  );
}
h1,
h3,
h5 {
  font-family: IBMPlexSansKR-Bold;
}
@font-face {
  font-family: "IBMPlexSansKR-Bold";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Bold.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>
