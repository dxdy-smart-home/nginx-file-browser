<template>
  <div id="app">
    <ul class="item-list">
      <component v-for="item in items"
          :item="item"
          :currentPath="currentPath"
          :key="item.name"
          @navigateTo="navigateTo"
          v-bind:is="item.component"
      />
    </ul>
  </div>
</template>

<script>
  import {doApiIndexPath} from '../helpers/url.js';
  import {getParentDir} from '../helpers/fileSystem.js';

  import { markRaw } from "vue";
  import Item from './Item.vue'
  import FileItem from './File.vue'
  import DirectoryItem from './Directory.vue'
  import ParentItem from './Parent.vue'

  export default {
    data() {
      var requestedPath = window.location.hash;
      var startPath = requestedPath ? requestedPath.substr(1) : "/";

      return { items: [], currentPath: startPath };
    },
    components: {
      Item
    },
    created() { this.navigateTo(this.currentPath); },
    methods: {
      async navigateTo(path) {
        var apiPath = doApiIndexPath(path);
        const response = await fetch(apiPath);
        var items = await response.json();

        this.currentPath = path;

        const parentDir = getParentDir(path);
        if(parentDir) {
          const parentItem = { type: "parent", name: "..", parent: parentDir }
          items = [parentItem].concat(items);
        }

        this.items = items.map((item) => {
          item.component = this.findItemComponentByName(item.type)
          return item;
        });

        history.replaceState(null, path, '#' + path);
      },
      findItemComponentByName(name) {
        var foundComponent = null;

        switch(name) {
          case 'directory': foundComponent = DirectoryItem; break;
          case 'parent': foundComponent = ParentItem; break;
          default: foundComponent = FileItem; break;
        }

        return markRaw(foundComponent);
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
