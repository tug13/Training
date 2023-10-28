<script setup lang="ts">
import NavbarVue from './components/NavbarVue.vue'
import SidebarVue from './components/SidebarVue.vue'
</script>

<template>
  <header>
    <NavbarVue />
    <SidebarVue />
  </header>
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  display: block;
  padding-left: 250px;
  padding-top: 3rem;
}
.container {
  padding-right: 3rem;
  padding-left: 3rem;
  margin-top: 3rem;
}
</style>
