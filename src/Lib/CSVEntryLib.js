function extractDate(csvItem) {
  return csvItem.Date
}

function extractPaidOut(csvItem) {
  return _convertPriceToDouble(csvItem.PaidOut)
}

function extractPaidIn(csvItem) {
  return _convertPriceToDouble(csvItem.PaidIn)
}

function extractDescription(csvItem) {
  return csvItem.Description
}

function _convertPriceToDouble(num) {
  return Number(num.replace(/[^0-9.-]+/g,""))
}

export {
  extractDate,
  extractPaidOut,
  extractPaidIn,
  extractDescription,
}
