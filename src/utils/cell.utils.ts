import type { ICell } from '@/types/ICell'
import { ECellType } from '../types/ECellType'
import { bombsAround } from './field.utils'

export function openCell(cell: ICell, field: ICell[][]) {
  if (cell.type !== ECellType.Cover) return

  let cellsToOpen = [cell]

  while (cellsToOpen.length > 0) {
    const cell2 = cellsToOpen.pop() as ICell
    if (cell2.isBomb) {
      cell2.type = ECellType.Bomb
    } else {
      cell2.type = ECellType.Empty
      if (cell2.bombsAround === 0) {
        ;(
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1]
          ] as [number, number][]
        ).forEach((offset) => {
          try {
            const cell3 = field[cell2.y + offset[0]][cell2.x + offset[1]]
            if (
              cell3.type === ECellType.Cover &&
              !cell3.isBomb &&
              cellsToOpen.indexOf(cell3) === -1
            ) {
              cellsToOpen.push(cell3)
              cellsToOpen = Array.from(new Set(cellsToOpen))
            }
          } catch {
            /* noop */
          }
        })
      }
    }
  }
}
