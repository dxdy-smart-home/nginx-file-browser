<template>
  <div id="app">
    <component :is="currentView" />
  </div>
</template>

<script>
  import ExplorerPage from './pages/Explorer.vue'
  import ErrorPage from './pages/Error.vue'

  import { Map } from './lib/Map.js'
  import VirtualURL from './lib/VirtualUrl.js'

  const map = Map.draw([
    { pattern: new URLPattern({ pathname:'/error-page' }), component: ErrorPage },
    { pattern: new URLPattern({ pathname: '/*' }), component: ExplorerPage }
  ]);

  export default {
    data() {
      return {
        currentUrl: VirtualURL.current()
      }
    },
    computed: {
      currentView() {
        return map.findComponentOrDefault(this.currentUrl.toString(), ErrorPage);
      }
    },
    mounted() {
      window.addEventListener('hashchange', () => {
  		  this.currentUrl = VirtualURL.current();
  		})
    }
  }
</script>
