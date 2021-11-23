<template>
  <div id="app">
    <navi-bar />
    <div id="main"><router-view /></div>
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

#main {
  height: 1300px;
}
</style>
