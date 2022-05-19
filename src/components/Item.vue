<template>
</template>

<script>
  export default {};
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
.item-list .other .item-name::before {
    background-image: url(../images/other.png);
}
.item-list .file-link {

}
.item-list .other .item-size {
    display: none;
}
</style>
