<template>
  <li class="directory">
    <a v-on:click="onClick" href="#" class="item-name">{{ item.name }}</a>
  </li>
</template>

<script>
  import {concatPath} from '../helpers/url.js';

  export default {
    props: { item: Object, currentPath: String },
    emits: ['navigateTo'],
    methods: {
      async onClick(event) {
        event.preventDefault();

        var path = concatPath(this.currentPath, this.item.name);
        this.$emit('navigateTo', path);
      }
    }
  };
</script>

<style>
.item-list .directory .item-name::before {
    background-image: url(../images/directory.png);

}
.item-list .directory .item-size {
    display: none;
}
</style>
