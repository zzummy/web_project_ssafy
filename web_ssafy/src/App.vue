<template>
  <div id="app" style="text-align: center">
    <navi-bar />
    <div id="main" style="margin-top: 16px">
      <router-view />
    </div>
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
</style>
