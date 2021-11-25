<template>
  <div id="app" style="text-align: center; font-family: IBMPlexSansKR-Text">
    <navi-bar />
    <div id="main" style="margin-top: 16px">
      <router-view />
    </div>
    <br /><br /><br /><br /><br /><br />
    <footer-bar />
  </div>
</template>

<script>
import NaviBar from "./components/layout/NaviBar.vue";
import FooterBar from "./components/layout/FooterBar.vue";

export default {
  name: "App",
  components: {
    NaviBar,
    FooterBar,
  },
};
</script>

<style>
a:hover {
  text-decoration: none;
  font-weight: bold;
}

a.router-link-exact-active {
  color: #8999ac;
}

footer-bar {
  z-index: 3;
  position: relative;
  height: auto;
}

@font-face {
  font-family: "IBMPlexSansKR-Text";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Text.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>
