<template>
  <h1 class="error">Oops!</h1>
  <p>Извините произошла ошибка &laquo;{{ error }}&raquo;</p>
  <a href="/">Перейти на главную страницу</a>
</template>

<script>
  import VirtualURL from '../lib/VirtualUrl.js';

  export default {
    data() {
      var url = VirtualURL.current();
      var error = url.searchParams.get('error') || 'Неизвестная ошибка';

      return { error: error };
    }
  }
</script>

<style>
h1.error {
  margin-top: 1em;
  font-size: 7em;
  font-weight: 500;
}
</style>
