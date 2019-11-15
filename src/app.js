import { Group } from './DataModels/Group'
import { Context } from './DataModels/Context'

import {
  readCsvFile,
  readConfig,
  writeReport,
} from './Lib/FileInteractionLib'

import {
  buildReport,
} from './Lib/ReportBuilderLib'

async function main() {
  const csvEntries = readCsvFile()
  const config = await readConfig()
  const context = new Context(config)

  const myGroups = config.Groups.map((group) => new Group(group, context))
  const reportData = buildReport(csvEntries, myGroups)

  await writeReport(JSON.stringify(reportData))
}

main()
