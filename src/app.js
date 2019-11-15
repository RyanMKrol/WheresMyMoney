import { Group } from './DataModels/Group'
import { Context } from './DataModels/Context'

import {
  readCsvFile,
  readConfig,
} from './FileReader'

async function main() {
  const csvEntries = readCsvFile()
  const config = await readConfig()
  const context = new Context(config)

  const myGroups = config.Groups.map((group) => new Group(group, context))
}

main()
