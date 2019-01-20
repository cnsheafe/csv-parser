import { Row, Cell } from './types'

export function parseRow(row: string, rowIndex: number, delimeter: string = ','): Row {
  const cells = row.split(delimeter)
    .map((p, columnIndex) => {
      let data: Cell['data'] = parseFloat(p)
      data = isNaN(data) ? p : data

      return { rowIndex, columnIndex, data }
    })

  return { rowIndex, cells }
}

export function mapCellsToColumns(headers: Row, cells: Cell[]): Map<string | number, Cell[]> {
  const map: Map<string | number, Cell[]> = new Map()

  headers.cells.forEach(hc => {
    const columnCells = cells.filter(c => c.columnIndex === hc.columnIndex)
    map.set(hc.data, columnCells)
  })

  return map
}

export default function parseCSV(csvLines: string[], delimeter: string = ','): Map<string | number, Cell[]> {
  const rows = csvLines.map((line, i) => parseRow(line, i, delimeter))
  const headers = rows[0]

  const cells: Cell[] = rows.slice(1)
    .reduce((acc: Cell[], row) => {
      return acc.concat(row.cells)
      // tslint:disable-next-line:align
    }, [])

  return mapCellsToColumns(headers, cells)
}