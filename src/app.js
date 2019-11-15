import { Group } from './DataModels/Group'
import { Context } from './DataModels/Context'
import csv from 'csv-parser'
import fs from 'fs'

const CSV_LOCATION = 'fileToParse.csv'

const csvEntries = readCsvFile(CSV_LOCATION)

readConfig().then((config) => {
  const context = new Context(config)
  const myGroups = config.Groups.map((group) => new Group(group, context))
})

function readCsvFile(fileLocation) {
  let csvEntries = []
  fs.createReadStream(fileLocation)
    .pipe(csv())
    .on('data', (data) => csvEntries.push(data))

  return csvEntries
}
function readConfig() {
  return new Promise((resolve, reject) => {
    fs.readFile('config.json', 'utf8', (err, rawJson) => {
      if (err) {
          reject(`Config read failed: ${err}`)
      }

      resolve(JSON.parse(rawJson))
    })
  })
}
