<template>
  <div id="app">
    <ul class="item-list">
      <Item v-for="item in items" :item="item" :currentPath="currentPath" :key="item.name" @navigateTo="navigateTo" />
    </ul>
  </div>
</template>

<script>
  import {doApiIndexPath} from '../helpers/url.js';
  import {getParentDir} from '../helpers/fileSystem.js';

  import Item from './Item.vue'

  export default {
    data() {
      var requestedPath = window.location.hash;
      var startPath = requestedPath ? requestedPath.substr(1) : "/";

      return { items: [], currentPath: startPath };
    },
    components: {
      Item
    },
    async created() {
      var apiPath = doApiIndexPath(this.currentPath);
      const response = await fetch(apiPath);
      const items = await response.json();

      this.navigateTo(this.currentPath, items);
    },
    methods: {
      navigateTo(path, items) {
        this.currentPath = path;

        const parentDir = getParentDir(path);
        if(parentDir) {
          const parentItem = { type: "parent", name: "..", parent: parentDir }
          items = [parentItem].concat(items);
        }

        this.items = items;
        history.replaceState(null, path, '#' + path);
      }
    }
  };
</script>

<style>
body > .container:first-child {
    margin: 3rem auto 0;
}

a {
    text-decoration: none;
}

.item-list {
    list-style: none;
}
</style>
