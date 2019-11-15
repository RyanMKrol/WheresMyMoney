import {
  extractDate,
  extractPrice,
  extractDescription,
} from './CSVEntryLib'

function buildReport(data, groups) {
  let reportData = {
    Spends: 0,
  }

  for (const csvEntry of data) {
    for (const group of groups) {
      const containingGroup = group.containsEntry(csvEntry)

      if(containingGroup[0]) {
        const subGroup = containingGroup[1]

        reportData = _setupReportEntry(reportData, group, subGroup)
        reportData = _addEntry(reportData, group.name, subGroup.name, csvEntry)

        break
      }
    }
  }

  return reportData
}

function _addEntry(currentData, groupName, subGroupName, csvEntry) {
  const entry = {
    Date: extractDate(csvEntry),
    Price: extractPrice(csvEntry),
    Description: extractDescription(csvEntry),
  }

  currentData[groupName][subGroupName].Entries.push(entry)
  currentData[groupName][subGroupName].Spends += entry.Price
  currentData[groupName].Spends += entry.Price
  currentData.Spends += entry.Price

  return currentData
}

function _setupReportEntry(currentData, group, subGroup) {
  const groupName = group.name
  const subGroupName = subGroup.name

  if (!currentData[groupName]) {
    currentData[groupName] = {
      Spends: 0
    }
  }
  if (!currentData[groupName][subGroupName]) {
    currentData[groupName][subGroupName] = {
      Entries: [],
      Spends: 0
    }
  }

  return currentData
}

export {
  buildReport,
}
