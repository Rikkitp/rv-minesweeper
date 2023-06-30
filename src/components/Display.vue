<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
import { useGame } from '@/stores/game'
import { EGameState } from '../types/EGameState'

const game = useGame()

const now = ref(new Date())

const duration = computed(() => dayjs.duration(+now.value - +game.startedAt).format('mm:ss'))

const timer = setInterval(() => {
  if (game.gameState === EGameState.Running) {
    now.value = new Date()
  }
}, 1000)

function newGameClick() {
  game.newGame()
}

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="row">
    <div class="bombs-left">{{ game.bombsLeft }}</div>
    <div class="game-state">
      <button @click="newGameClick">
        <span v-if="game.gameState === EGameState.Running">🙂</span>
        <span v-else-if="game.gameState === EGameState.Win">😎</span>
        <span v-else-if="game.gameState === EGameState.Lose">😭</span>
      </button>
    </div>
    <div class="duration">{{ duration }}</div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
}

.bombs-left {
  width: 50px;
  text-align: right;
  background: wheat;
  padding-right: 5px;
}

/* .game-state > button {
  border: 1px solid lightgray;
} */

.duration {
  background: wheat;
  width: 50px;
  text-align: center;
}
</style>
