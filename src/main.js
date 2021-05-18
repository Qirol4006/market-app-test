import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './axios'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'vue-owl-carousel'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
};


Vue.use(Toast, options);


Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
