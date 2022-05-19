<template>
  <div id="app">
    <ErrorPage v-if="error" :error="error" />
    <Items v-else :items="items" :currentPath="currentPath" @navigateTo="navigateTo" />
  </div>
</template>

<script>
  import {doApiIndexPath, getPathFromBrowser} from '../helpers/url.js';
  import {getParentDir} from '../helpers/fileSystem.js';

  import Items from "./Items.vue"
  import ErrorPage from './ErrorPage.vue'

  export default {
    components: { Items, ErrorPage },
    data() {
      return { items: [], currentPath: getPathFromBrowser(), error: null }
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
          history.replaceState(null, path, '#' + path);

        } catch(error) {
          this.error = error.message
          this.items = [];
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
