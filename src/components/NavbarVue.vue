<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale, availableLocales } = useI18n()
</script>
<template>
  <nav class="navbarvue">
    <select class="lang" v-model="locale">
      <option
        v-for="availableLocale in availableLocales"
        :key="availableLocale"
        :value="availableLocale"
      >
        {{ availableLocale }}
      </option>
    </select>
  </nav>
</template>

<style scoped>
.navbarvue {
  justify-content: end;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  display: flex;
  padding-left: 250px;
  height: 58px;
  box-shadow:
    0 2px 5px 0 rgb(0 0 0 / 5%),
    0 2px 10px 0 rgb(0 0 0 / 5%);
}
.lang {
  height: 35px;
  margin-right: 5px;
}
</style>
