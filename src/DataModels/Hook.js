export class Hook {

  constructor(jsonString, validFields) {
    this._validateParams(jsonString, validFields)

    this.key = jsonString.Key
    this.hook = jsonString.Hook
  }

  _validateParams(jsonString, validFields) {
    if (!jsonString.Key) {
      throw new Error(`Could not parse Hook key - ${jsonString}`)
    }
    if (!jsonString.Hook) {
      throw new Error('Could not parse Hook hook')
    }
    if (!validFields.includes(jsonString.Key)) {
      throw new Error(`Invalid hook - ${jsonString.Key}`)
    }
  }
}
