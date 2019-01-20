import path from 'path'
import { readCSV, writeJSON } from './cli'

async function main() {
  const csvPath = path.resolve(__dirname, process.argv[1])
  const writePath = path.resolve(__dirname, process.argv[2])
  const delimiter = process.argv[3] || ','

  const columns = await readCSV(csvPath, delimiter)

  await writeJSON(writePath, columns)
}

main()