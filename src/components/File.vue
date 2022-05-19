<template>
  <li class="file">
    <a v-bind:href="url" target="_blank" class="item-name">{{ item.name }}</a>
    <span class="item-size">{{ this.fileSize }}</span>
  </li>
</template>

<script>
  import {doApiPath, concatPath} from '../helpers/url.js';
  import {prettySize} from '../helpers/fileSystem.js';

  export default {
    props: { item: Object, currentPath: String },
    computed: {
      fileSize() { return prettySize(this.item.size); },
      url() {
        var filePath = concatPath(this.currentPath, this.item.name);
        return doApiPath(filePath)
      }
    }
  };
</script>

<style>
.item-list .file .item-name::before {
    background-image: url(../images/file.png);
}

.item-list .item-size {
    padding: .25rem .5rem;
    background: #24db53;
    border-radius: .5rem;
    font-size: 70%;
    margin: 0 .5rem;
    color: #fff;
}
</style>
