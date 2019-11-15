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

  const outgoingConfig = config.OutgoingGroups
  const incomingConfig = config.IncomeGroups

  const context = new Context(config)

  const myOutgoingGroups = outgoingConfig.map((group) => new Group(group, context))
  const myIncomingGroups = incomingConfig.map((group) => new Group(group, context))

  const reportData = buildReport(csvEntries, myOutgoingGroups, myIncomingGroups)

  await writeReport(JSON.stringify(reportData))
}

main()
