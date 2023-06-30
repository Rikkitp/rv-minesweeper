<script setup lang="ts">
import Display from './components/Display.vue'
import MineField from './components/MineField.vue'
</script>

<template>
  <div class="app">
    <Display />
    <MineField />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid lightgray;
  background-color: hsl(0deg 0% 94%);
  padding: 10px;
}
</style>
