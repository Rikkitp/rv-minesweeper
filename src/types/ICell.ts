import type { ECellType } from './ECellType'

export interface ICell {
  x: number
  y: number
  isBomb: boolean
  type: ECellType
  bombsAround: number
}
