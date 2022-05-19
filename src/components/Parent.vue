<template>
  <li class="parent">
    <a v-on:click="onClick" href="#" class="item-name">{{ item.name }}</a>
  </li>
</template>

<script>
  export default {
    props: { item: Object, currentPath: String },
    emits: ['navigateTo'],
    methods: {
      async onClick(event) {
        event.preventDefault();
        this.$emit('navigateTo', this.item.parent);
      }
    }
  };
</script>

<style>
.item-list .parent .item-name::before {
    background-image: url(../images/parent.png);
}
.item-list .parent .item-size {
    display: none;
}
</style>
