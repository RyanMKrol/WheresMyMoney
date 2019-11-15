export class Hook {

  constructor(jsonString, context) {
    this._validateParams(jsonString, context)

    this.key = jsonString.Key
    this.hook = jsonString.Hook
  }

  _validateParams(jsonString, context) {
    if (!jsonString.Key) {
      throw new Error(`Could not parse Hook key - ${jsonString}`)
    }
    if (!jsonString.Hook) {
      throw new Error('Could not parse Hook hook')
    }
    if (!context.validateCsvField(jsonString.Key)) {
      throw new Error(`Invalid hook - ${jsonString.Key}`)
    }
  }

  hooks(csvItem) {
    return csvItem[this.key].includes(this.hook)
  }
}
