<template>
  <h1>Файлы</h1>
  <ul class="item-list">
    <component v-for="item in wrappedItems"
        :item="item"
        :currentPath="currentPath"
        :key="item.name"
        @navigateTo="navigateTo"
        v-bind:is="item.component"
    />
  </ul>
</template>

<script>
  import { markRaw } from "vue";
  import Item from './Item.vue'
  import FileItem from './File.vue'
  import DirectoryItem from './Directory.vue'
  import ParentItem from './Parent.vue'

  export default {
    props: { items: Array, currentPath: String },
    emits: ['navigateTo'],
    components: { Item },
    computed: {
      wrappedItems() {
        return this.items.map((item) => {
          item.component = this.findItemComponentByName(item.type)
          return item;
        });
      }
    },
    methods: {
      navigateTo(path) {
        this.$emit('navigateTo', path);
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
.item-list {
    list-style: none;
}
</style>
