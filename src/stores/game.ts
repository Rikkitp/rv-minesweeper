import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ECellType } from '@/types/ECellType'
import { checkGameState, generateField, placeBombs } from '@/utils/field.utils'
import { openCell } from '@/utils/cell.utils'
import { EGameState } from '@/types/EGameState'

export const useGame = defineStore('game', () => {
  const field = ref(generateField(10, 9, 9))
  const gameState = ref(EGameState.Running)
  const startedAt = ref(new Date())
  const cellList = computed(() => field.value.flatMap((r) => r))
  const bombsLeft = computed(() =>
    cellList.value.reduce((acc, cell) => (cell.type === ECellType.BombMark ? acc - 1 : acc), 10)
  )

  const open = (x: number, y: number) => {
    if (gameState.value !== EGameState.Running) return

    const cell = cellList.value.find((c) => c.x === x && c.y === y)

    if (!cell) throw new Error('cell does not found')
    console.log(cell, field.value)
    openCell(cell, field.value)

    gameState.value = checkGameState(field.value)
  }

  const mark = (x: number, y: number) => {
    if (gameState.value !== EGameState.Running) return

    const cell = cellList.value.find((c) => c.x === x && c.y === y)

    if (!cell) throw new Error('cell does not found')

    if (cell.type === ECellType.Cover) {
      cell.type = ECellType.BombMark
    } else if (cell.type === ECellType.BombMark) {
      cell.type = ECellType.Cover
    }
  }

  const newGame = () => {
    console.log('newGame')
    gameState.value = EGameState.Running
    startedAt.value = new Date();
    field.value = generateField(10, 9, 9)
  }

  return {
    field,
    cellList,
    bombsLeft,
    gameState,
    startedAt,
    open,
    mark,
    newGame
  }
})
