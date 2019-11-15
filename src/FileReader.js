import csv from 'csv-parser'
import fs from 'fs'

const CSV_LOCATION = 'fileToParse.csv'
const CONFIG_LOCATION = 'config.json'

function readCsvFile() {
  let csvEntries = []
  fs.createReadStream(CSV_LOCATION)
    .pipe(csv())
    .on('data', (data) => csvEntries.push(data))

  return csvEntries
}

function readConfig() {
  return new Promise((resolve, reject) => {
    fs.readFile(CONFIG_LOCATION, 'utf8', (err, rawJson) => {
      if (err) {
          reject(`Config read failed: ${err}`)
      }

      resolve(JSON.parse(rawJson))
    })
  })
}

export {
  readCsvFile,
  readConfig,
}
