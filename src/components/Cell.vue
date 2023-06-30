<script setup lang="ts">
import { useGame } from '@/stores/game'
import { ECellType } from '@/types/ECellType'
import type { ICell } from '@/types/ICell'
import { computed } from 'vue'

const props = defineProps<{
  type: ICell['type']
  bombsAround: ICell['bombsAround']
  x: ICell['x']
  y: ICell['y']
}>()

const game = useGame()

function handleClick() {
  game.open(props.x, props.y)
}

function handleMark() {
  game.mark(props.x, props.y)
}

// function handleHold() {
//   game.hold(props.x, props.y)
//   <!-- @mousedown="handleHold" -->
// }

const emptyNumber = computed(() => (props.bombsAround === 0 ? '' : String(props.bombsAround)))
</script>

<template>
  <div class="cell" :class="type" @mouseup.left="handleClick" @click.right.prevent="handleMark">
    <span v-if="type === ECellType.Cover"></span>
    <span v-else-if="type === ECellType.Bomb">💣</span>
    <span v-else-if="type === ECellType.BombMark">🚩</span>
    <span v-else-if="type === ECellType.Empty">{{ emptyNumber }}</span>
  </div>
</template>

<style scoped>
.cell {
  background-color: #d3d3d3;
  width: var(--cell-size);
  height: var(--cell-size);
  text-align: center;
  cursor: pointer;
}

.empty,
.bomb {
  background-color: hsl(0deg 0% 93%);
}
</style>
