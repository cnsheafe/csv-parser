export interface Cell {
  rowIndex: number
  columnIndex: number
  data: string | number
}

export interface Row {
  rowIndex: number
  cells: Cell[],
}