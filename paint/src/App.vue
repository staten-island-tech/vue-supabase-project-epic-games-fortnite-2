<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <NavBar />
  <RouterView class="view" />
</template>
<style scoped>
.view {
  width: 100%;
  height: 100%;
}
</style>
