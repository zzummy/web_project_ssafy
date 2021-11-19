import Vue from 'vue'
import App from './App.vue'
import router from './router'
//fontawesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//fontawesome JS 
import { library } from '@fortawesome/fontawesome-svg-core'
//fontawesome icons
import { fas } from '@fortawesome/free-solid-svg-icons'
//brands icons
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, fab);
//bootstrap
import 'bootstrap/scss/bootstrap.scss'
// You can specify which plugins you need
import { Tooltip, Toast, Popover } from 'bootstrap';

// 추가
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store";
import memberStore from "./store/modules/memberStore";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
    router,
    store,
    Tooltip,
    Toast,
    Popover,
    async beforeCreate() {
      let token = sessionStorage.getItem("access-token");
      if (memberStore.state.userInfo == null && token) {
        await memberStore.dispatch("getUserInfo", token);
      }
    },
    render: (h) => h(App),
  }).component('fa', FontAwesomeIcon).$mount("#app");