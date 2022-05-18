import normalizeCss from './css/normalize.css'
import skeletonCss from './css/skeleton.css'

import { createApp } from 'vue'
import App from './components/App.vue'

document.addEventListener("DOMContentLoaded", () => {
  createApp(App).mount("#app");
});
