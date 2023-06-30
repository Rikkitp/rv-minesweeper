<script setup lang="ts">
import Cell from './Cell.vue'
import { useGame } from '../stores/game'

const game = useGame()
</script>

<template>
  <div class="mine-field">
    <Cell
      v-for="cell in game.cellList"
      :type="cell.type"
      :bombs-around="cell.bombsAround"
      :x="cell.x"
      :y="cell.y"
    />
  </div>
</template>

<style scoped>
.mine-field {
  width: calc(var(--cell-size) * 9 + 8px);
  height: calc(var(--cell-size) * 9 + 8px);
  box-sizing: content-box;
  background-color: gray;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1px;
  padding: 1px;
}
</style>
