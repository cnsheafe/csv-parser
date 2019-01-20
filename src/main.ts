import path from 'path'
import { readCSV, writeJSON } from './cli'

async function main() {
  // TODO: use option flags to pick the correct argv
  const csvPath = path.resolve(__dirname, process.argv[2])
  const writePath = path.resolve(__dirname, process.argv[3])
  const delimiter = process.argv[4] || ','

  const columns = await readCSV(csvPath, delimiter)

  await writeJSON(writePath, columns)
}

main()