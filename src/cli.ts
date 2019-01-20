import { readFile, writeFile } from 'fs'
import { promisify } from 'util'
import parseCSV from './parser';
import { Cell } from './types'

const read = promisify(readFile)
const write = promisify(writeFile)

export async function readCSV(readPath: string, delimeter: string) {
  const csvLines = (await read(readPath, { encoding: 'utf8' })).split('\n')

  return parseCSV(csvLines, delimeter)
}

export async function writeJSON(writePath: string, parsedCsv: Map<string|number, Cell[]>) {
  // TODO: convert map into JSON of form { "columnName": Cell[] } instead of ["columnName", Cell[]]
  await write(writePath, JSON.stringify([...parsedCsv]), { encoding: 'utf8' })
}