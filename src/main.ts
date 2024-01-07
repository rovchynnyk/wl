import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from "@tanstack/vue-query";

import localforage from 'localforage';

const app = createApp(App)

localforage.config({
  name: 'wl',
  storeName: 'gallery'
});

app.use(router)

app.use(VueQueryPlugin)

app.mount('#app')
