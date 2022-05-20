import normalizeCss from './css/normalize.css'
import skeletonCss from './css/skeleton.css'

import App from './App.vue'

import { createApp } from 'vue'

document.addEventListener("DOMContentLoaded", () => {
  createApp(App).mount("#app");
});
