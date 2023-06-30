import { ECellType } from '@/types/ECellType'
import type { ICell } from '../types/ICell'
import { getRandomInt } from './getRandomInt'
import { EGameState } from '../types/EGameState'

export function generateField(bombsAmount: number, width: number, height: number): ICell[][] {
  const placeholder = Array(height)
    .fill(undefined)
    .map(() => Array(width).fill(undefined))

  // generate cells
  const field: ICell[][] = placeholder.map((row, i) =>
    row.map<ICell>((_cell, j) => ({
      x: j,
      y: i,
      isBomb: false,
      type: ECellType.Cover,
      bombsAround: 0
    }))
  )

  placeBombs(field, bombsAmount)

  for (const row of field) {
    for (const cell of row) {
      cell.bombsAround = bombsAround(field, cell.x, cell.y)
    }
  }

  return field
}

export function bombsAround(field: ICell[][], x: number, y: number) {
  let sum = 0
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      try {
        const x2 = x + i
        const y2 = y + j
        const num = field[y2][x2].isBomb ? 1 : 0
        sum += num
      } catch {
        // noop
      }
    }
  }
  return sum
}

export function placeBombs(field: ICell[][], bombsAmount: number) {
  let bombsLeft = bombsAmount
  // place bombs
  while (bombsLeft > 0) {
    const row = field[getRandomInt(field.length)]
    const cell = row[getRandomInt(row.length)]
    if (!cell.isBomb) {
      cell.isBomb = true
      bombsLeft--
    }
  }

  return field
}

export function checkGameState(field: ICell[][]) {
  // check lose
  for (const row of field) {
    for (const cell of row) {
      if (cell.type === ECellType.Bomb) return EGameState.Lose
    }
  }

  // check running
  for (const row of field) {
    for (const cell of row) {
      if (cell.type === ECellType.Cover || (cell.type === ECellType.BombMark && !cell.isBomb)) {
        return EGameState.Running
      }
    }
  }

  return EGameState.Win
}
