import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import axios from 'axios';
import store from './store';


axios.defaults.baseURL = 'http://localhost:3000';

const app = createApp(App);
app.use(router);
app.config.globalProperties.$http = axios;
app.use(router);
app.use(store);
app.mount('#app');