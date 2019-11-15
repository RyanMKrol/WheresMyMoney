import { Hook } from './Hook'

export class SubGroup {

  constructor(jsonString, context) {
    this._validateParams(jsonString)

    this.name = jsonString.Name
    this.hooks = jsonString.Hooks.map((item) => new Hook(item, context))
  }

  _validateParams(jsonString) {
    if (!jsonString.Name) {
      throw new Error('Could not parse SubGroup name')
    }
    if (!jsonString.Hooks || !Array.isArray(jsonString.Hooks)) {
      throw new Error('Could not parse SubGroup hooks')
    }
  }

  isQualifyingEntry(csvItem) {
     return this.hooks.some((item) => item.hooks(csvItem)) ? this : undefined
  }

}
