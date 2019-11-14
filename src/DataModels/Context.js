// Holds certain elements of state about the program
//  * validCsvFields - these will be used to validate the hooks
//    that the user is trying to pull from config

export class Context {

  constructor(jsonString) {
    this._validateParams(jsonString)

    this.validCsvFields = jsonString.CSVFields
  }

  _validateParams(jsonString) {
    if (!jsonString.CSVFields || !Array.isArray(jsonString.CSVFields)) {
      throw new Error('Could not parse CSVFields from config')
    }
  }

  validateCsvField(entry) {
    return this.validCsvFields.includes(entry)
  }

}
