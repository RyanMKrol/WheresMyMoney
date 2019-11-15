import {
  extractDate,
  extractPrice,
  extractDescription,
} from './CSVEntryLib'

import { DEFAULT_GROUP } from './../DataModels/Group'

function buildReport(data, groups) {
  let reportData = {
    Spends: 0,
  }

  for (const csvEntry of data) {
    const groupResult = _runThroughGroups(reportData, groups, csvEntry)
    reportData = groupResult[1]

    if(!groupResult[0]) {
      reportData = _setupReportEntry(reportData, DEFAULT_GROUP)
      reportData[DEFAULT_GROUP.name].Entries.push(csvEntry)
      reportData[DEFAULT_GROUP.name].Spends += extractPrice(csvEntry)
    }
  }

  return reportData
}

function _runThroughGroups(reportData, groups, csvEntry) {
  for (const group of groups) {
    const containingGroup = group.containsEntry(csvEntry)

    if(containingGroup[0]) {
      const subGroup = containingGroup[1]

      reportData = _setupReportEntry(reportData, group, subGroup)
      reportData = _addEntry(reportData, group.name, subGroup.name, csvEntry)

      return [true, reportData]
    }
  }

  return [false, reportData]
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
  const subGroupName = subGroup ? subGroup.name : undefined

  if (!currentData[groupName]) {
    // if there's no subgroup name, we're setting up the global misc group,
    // if there is, we're setting up a standard subgroup
    currentData[groupName] = subGroupName ? {
      Spends: 0,
    } : {
      Spends: 0,
      Entries: [],
    }
  }
  if (subGroupName && !currentData[groupName][subGroupName]) {
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