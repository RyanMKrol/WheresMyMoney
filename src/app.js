import { Group } from './DataModels/Group'
import { Context } from './DataModels/Context'

import {
  readCsvFile,
  readConfig,
  writeReport,
} from './FileInteractionLib'

import {
  buildReport,
} from './ReportBuilderLib'

async function main() {
  const csvEntries = readCsvFile()
  const config = await readConfig()
  const context = new Context(config)

  const myGroups = config.Groups.map((group) => new Group(group, context))
  const reportData = buildReport(csvEntries, myGroups)

  await writeReport(JSON.stringify(reportData))
}

main()
