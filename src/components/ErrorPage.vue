<template>
  <h1 class="error">Oops!</h1>
  <p>Извините произошла ошибка &laquo;{{ error }}&raquo;</p>
  <a href="/">Перейти на главную страницу</a>
</template>

<script>
  export default {
    props: { error: String }
  }
</script>

<style>
h1.error {
  margin-top: 1em;
  font-size: 7em;
  font-weight: 500;
}
</style>
