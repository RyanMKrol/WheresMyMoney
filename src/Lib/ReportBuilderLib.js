import {
  extractDate,
  extractOutgoings,
  extractDescription,
} from './CSVEntryLib'

import { DEFAULT_GROUP } from './../DataModels/Group'

function buildReport(data, groups) {
  let reportData = {
    Spends: 0,
  }

  for (const csvEntry of data) {
    const csvOutgoings = extractOutgoings(csvEntry)
    reportData.Spends += csvOutgoings

    const groupResult = _runThroughGroups(reportData, groups, csvEntry)
    reportData = groupResult[1]

    if(!groupResult[0]) {
      reportData = _setupReportEntry(reportData, DEFAULT_GROUP)
      reportData[DEFAULT_GROUP.name].Entries.push(_buildEntry(csvEntry))
      reportData[DEFAULT_GROUP.name].Spends += csvOutgoings
    }
  }

  for(const group in reportData) {
    if (group === 'Spends') continue

    if(reportData[group].Entries) {
      reportData[group].Entries.sort((a,b) => b.Price - a.Price)
    } else {
      for (const subGroup in reportData[group]) {
        if (subGroup === 'Spends') continue
        if (reportData[group][subGroup].Entries) {
          reportData[group][subGroup].Entries.sort((a,b) => b.Price - a.Price)
        }
      }
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

function _buildEntry(csvEntry) {
  return {
    Date: extractDate(csvEntry),
    Price: extractOutgoings(csvEntry),
    Description: extractDescription(csvEntry),
  }
}

function _addEntry(currentData, groupName, subGroupName, csvEntry) {
  const entry = _buildEntry(csvEntry)

  currentData[groupName][subGroupName].Entries.push(entry)
  currentData[groupName][subGroupName].Spends += entry.Price
  currentData[groupName].Spends += entry.Price

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
