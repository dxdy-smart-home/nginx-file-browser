<template>
  <Items :items="items" :currentPath="currentPath" @navigateTo="navigateTo" />
</template>

<script>
  import {doApiIndexPath} from '../helpers/url.js';
  import {getParentDir} from '../helpers/fileSystem.js';
  import VirtualURL from '../lib/VirtualUrl.js';

  import Items from "../components/Items.vue"

  export default {
    components: { Items },
    data() {
      var url = VirtualURL.current();
      return { items: [], currentPath: url.pathname, error: null }
    },
    created() { this.navigateTo(this.currentPath); },
    methods: {
      async fetchItems(path) {
        var apiPath = doApiIndexPath(path);

        const response = await fetch(apiPath);
        if (!response.ok) {
          throw new Error(`Server error ${response.status}`);
        }

        var items = await response.json();

        const parentDir = getParentDir(path);
        if(parentDir) {
          const parentItem = { type: "parent", name: "..", parent: parentDir }
          items = [parentItem].concat(items);
        }

        return items;
      },

      async navigateTo(path) {
        try {
          this.items = await this.fetchItems(path);

          this.error = null;
          this.currentPath = path;
          history.replaceState(null, path, `#${path}`);

        } catch(error) {
          const params = new URLSearchParams();
          params.set('error', error.message);

          VirtualURL.redirectTo('/error-page', params);
        }
      }
    }
  }
</script>

<style>
body > .container:first-child {
  margin: 3rem auto 0;
}

a {
  text-decoration: none;
}
</style>
