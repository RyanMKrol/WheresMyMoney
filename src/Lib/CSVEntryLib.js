function extractDate(csvItem) {
  return csvItem.Date
}

function extractPrice(csvItem) {
  return _convertPriceToDouble(csvItem.PaidOut)
}

function extractDescription(csvItem) {
  return csvItem.Description
}

function _convertPriceToDouble(num) {
  return Number(num.replace(/[^0-9.-]+/g,""))
}

export {
  extractDate,
  extractPrice,
  extractDescription,
}
