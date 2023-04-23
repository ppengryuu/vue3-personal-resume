import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import request from './utils/request'
import common from './utils/common'
import './stylus/main.styl'
import 'remixicon/fonts/remixicon.css'

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');

app.config.globalProperties.$http = request;
app.config.globalProperties.common = common;
