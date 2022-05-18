<template>
  <li v-bind:class="[ item.type ]">
    <a v-on:click="onClick" v-bind:href="url" v-bind:target="targetUrl" class="item-name">{{ item.name }}</a>
    <span v-if="isFile" class="item-size">{{ this.fileSize }}</span>
  </li>
</template>

<script>
  import {doApiIndexPath, doApiPath, concatPath} from '../helpers/url.js';
  import {prettySize} from '../helpers/fileSystem.js';

  export default {
    props: { item: Object, currentPath: String },
    computed: {
      fileSize() { return prettySize(this.item.size); },
      isFile() { return this.item.type === 'file'; },
      url() {
        if (!this.isFile) return '#';

        var filePath = concatPath(this.currentPath, this.item.name);
        return doApiPath(filePath)
      },
      targetUrl() {
        return (this.isFile) ? '_blank' : '_self';
      }
    },
    methods: {
      async onClick(event) {
        switch(this.item.type) {
          case 'directory': {
            this.navigateTo(concatPath(this.currentPath, this.item.name));
          } break;
          case 'parent': {
            this.navigateTo(this.item.parent);
          } break;
          case 'file': {
            // nothing
          } break;
        }
      },

      async navigateTo(path) {
        const response = await fetch(doApiIndexPath(path));
        var items = await response.json();

        this.$emit('navigateTo', path, items);
      }
    }
  };
</script>

<style>
.item-list li {
    margin: 1rem 0;
}

.item-list .item-name {
    line-height: 4rem;
    display: inline-block;
    position: relative;
    padding-left: 4rem;
}

.item-list .item-name::before {
    background: no-repeat center center;
    background-size: contain;
    width: 3rem;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
}

.item-list .directory .item-name::before {
    background-image: url(../images/directory.png);

}

.item-list .file .item-name::before {
    background-image: url(../images/file.png);
}

.item-list .other .item-name::before {
    background-image: url(../images/other.png);
}

.item-list .parent .item-name::before {
    background-image: url(../images/parent.png);
}

.item-list .file-link {

}

.item-list .item-size {
    padding: .25rem .5rem;
    background: #24db53;
    border-radius: .5rem;
    font-size: 70%;
    margin: 0 .5rem;
    color: #fff;
}

.item-list .other .item-size,
.item-list .parent .item-size,
.item-list .directory .item-size {
    display: none;
}
</style>
