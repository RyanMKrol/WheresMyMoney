import {
  extractDate,
  extractPaidOut,
  extractPaidIn,
  extractDescription,
} from './CSVEntryLib'

import { DEFAULT_GROUP } from './../DataModels/Group'

function buildReport(data, outgoingGroups, incomingGroups) {
  const outgoingReportData = _sortReportData(
    addGroupItems(data, outgoingGroups, (item) => extractPaidOut(item))
  )
  const incomingReportData = _sortReportData(
    addGroupItems(data, incomingGroups, (item) => extractPaidIn(item))
  )
  console.log(incomingReportData)

  return {
    Income: incomingReportData,
    Outgoing: outgoingReportData,
  }
}

function addGroupItems(data, groups, priceFunction) {
  let reportData = {
    Amount: 0,
  }

  for (const csvEntry of data) {
    const csvAmount = priceFunction(csvEntry)

    if (csvAmount === 0) {
      continue
    }
    reportData.Amount += csvAmount

    const groupResult = _runThroughGroups(reportData, groups, csvEntry, priceFunction)
    reportData = groupResult[1]

    if(!groupResult[0]) {
      reportData = _setupReportEntry(reportData, DEFAULT_GROUP)
      reportData[DEFAULT_GROUP.name].Entries.push(_buildEntry(csvEntry, priceFunction))
      reportData[DEFAULT_GROUP.name].Amount += csvAmount
    }
  }

  return reportData
}

function _sortReportData(reportData) {
  for(const group in reportData) {
    if (group === 'Amount') continue

    if(reportData[group].Entries) {
      reportData[group].Entries.sort((a,b) => b.Price - a.Price)
    } else {
      for (const subGroup in reportData[group]) {
        if (subGroup === 'Amount') continue
        if (reportData[group][subGroup].Entries) {
          reportData[group][subGroup].Entries.sort((a,b) => b.Price - a.Price)
        }
      }
    }
  }

  return reportData
}

function _runThroughGroups(reportData, groups, csvEntry, priceFunction) {
  for (const group of groups) {
    const containingGroup = group.containsEntry(csvEntry)

    if(containingGroup[0]) {
      const subGroup = containingGroup[1]

      reportData = _setupReportEntry(reportData, group, subGroup)
      reportData = _addEntry(reportData, group.name, subGroup.name, csvEntry, priceFunction)

      return [true, reportData]
    }
  }

  return [false, reportData]
}

function _buildEntry(csvEntry, priceFunction) {
  return {
    Date: extractDate(csvEntry),
    Price: priceFunction(csvEntry),
    Description: extractDescription(csvEntry),
  }
}

function _addEntry(currentData, groupName, subGroupName, csvEntry, priceFunction) {
  const entry = _buildEntry(csvEntry, priceFunction)

  currentData[groupName][subGroupName].Entries.push(entry)
  currentData[groupName][subGroupName].Amount += entry.Price
  currentData[groupName].Amount += entry.Price

  return currentData
}

function _setupReportEntry(currentData, group, subGroup) {
  const groupName = group.name
  const subGroupName = subGroup ? subGroup.name : undefined

  if (!currentData[groupName]) {
    // if there's no subgroup name, we're setting up the global misc group,
    // if there is, we're setting up a standard subgroup
    currentData[groupName] = subGroupName ? {
      Amount: 0,
    } : {
      Amount: 0,
      Entries: [],
    }
  }
  if (subGroupName && !currentData[groupName][subGroupName]) {
    currentData[groupName][subGroupName] = {
      Entries: [],
      Amount: 0
    }
  }

  return currentData
}

export {
  buildReport,
}
