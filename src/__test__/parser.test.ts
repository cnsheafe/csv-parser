import parseCSV, { parseRow, mapCellsToColumns } from '../parser'
import { Cell } from '../types'

describe('#parseRow()', () => {
  it('should create an Row', () => {
    const rowData = 'John,Smith,Pilot,25000,Dec-15-2018,United Airlines'
    const parsed = parseRow(rowData, 1)

    expect(parsed.rowIndex).toBe(1)
    expect(parsed.cells).toEqual([
      {
        rowIndex: 1,
        columnIndex: 0,
        data: 'John',
      },
      {
        rowIndex: 1,
        columnIndex: 1,
        data: 'Smith',
      },
      {
        rowIndex: 1,
        columnIndex: 2,
        data: 'Pilot',
      },

      {
        rowIndex: 1,
        columnIndex: 3,
        data: 25000,
      },
      {
        rowIndex: 1,
        columnIndex: 4,
        data: 'Dec-15-2018',
      },
      {
        rowIndex: 1,
        columnIndex: 5,
        data: 'United Airlines',
      },
    ])
  })
})

describe('#mapCellsToHeader()', () => {
  it('should create a Map that associates columns with matching cells', () => {
    const cells = [
      {
        rowIndex: 1,
        columnIndex: 0,
        data: 'John',
      },
      {
        rowIndex: 1,
        columnIndex: 1,
        data: 'Smith',
      },
      {
        rowIndex: 3,
        columnIndex: 0,
        data: 'Claire',
      },
      {
        rowIndex: 2,
        columnIndex: 1,
        data: 'Thompson',
      },
      {
        rowIndex: 4,
        columnIndex: 0,
        data: 'Jerry',
      },
      {
        rowIndex: 1,
        columnIndex: 5,
        data: 'United Airlines',
      },
      {
        rowIndex: 3,
        columnIndex: 5,
        data: 'Delta Airlines'
      },
      {
        rowIndex: 3,
        columnIndex: 3,
        data: 75000
      },
      {
        rowIndex: 4,
        columnIndex: 3,
        data: 33000
      }
    ]

    const headers = {
      rowIndex: 0,
      cells: [
        {
          rowIndex: 0,
          columnIndex: 0,
          data: 'First Name'
        },
        {
          rowIndex: 0,
          columnIndex: 1,
          data: 'Last Name'
        },
        {
          rowIndex: 0,
          columnIndex: 2,
          data: 'Position'
        },
        {
          rowIndex: 0,
          columnIndex: 3,
          data: 'Salary'
        },
        {
          rowIndex: 0,
          columnIndex: 4,
          data: 'Start Date'
        },
        {
          rowIndex: 0,
          columnIndex: 5,
          data: 'Airline'
        },
      ]
    }
    const columns = mapCellsToColumns(headers, cells)
    expect(columns).toEqual(new Map([
      ['First Name', [{ ...cells[0] }, { ...cells[2] }, { ...cells[4] }]],
      ['Last Name', [{ ...cells[1] }, { ...cells[3] }]],
      ['Salary', [{ ...cells[7] }, { ...cells[8], }]],
      ['Airline', [{ ...cells[5] }, { ...cells[6] }]],
      ['Start Date', []],
      ['Position', []]
    ]))
  })
})

describe('#parseCSV()', () => {
  it('should create a Map of all the columns', () => {
    const csv = [
      'First Name,Last Name,Position,Salary,Start Date,Airline',
      'John,Smith,Pilot,25000,Dec-15-2018,United Airlines',
      'David,Thompson,Pilot,35000,Jan-7-2015,Delta Airlines',
      'Claire,White,Technician,75000,May-29-2014,Delta Airlines',
      'Jerry,Seinfield,Comedian,33000,June-11-2011,Spirit Airlines',
    ]

    const firstnames = ['John', 'David', 'Claire', 'Jerry']
    const lastnames = ['Smith', 'Thompson', 'White', 'Seinfield']
    const positions = ['Pilot', 'Pilot', 'Technician', 'Comedian']
    const salaries = [25000, 35000, 75000, 33000]
    const dates = ['Dec-15-2018', 'Jan-7-2015', 'May-29-2014', 'June-11-2011']
    const airlines = ['United Airlines', 'Delta Airlines', 'Delta Airlines', 'Spirit Airlines']

    const createColumns = (cells: any[], columnIndex: number): Cell[] =>
      cells.map((c, i) => ({
        rowIndex: i + 1,
        columnIndex,
        data: c,
      }))

    const columns = parseCSV(csv)

    expect(columns).toEqual(new Map([
      ['First Name', createColumns(firstnames, 0)],
      ['Last Name', createColumns(lastnames, 1)],
      ['Position', createColumns(positions, 2)],
      ['Salary', createColumns(salaries, 3)],
      ['Start Date', createColumns(dates, 4)],
      ['Airline', createColumns(airlines, 5)]
    ]))
  })
})