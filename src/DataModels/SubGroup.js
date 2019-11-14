import { Hook } from './Hook'

export class SubGroup {

  constructor(jsonString, validHooks) {
    this._validateParams(jsonString)

    this.name = jsonString.Name
    this.hooks = jsonString.Hooks.map((item) => new Hook(item, validHooks))
  }

  _validateParams(jsonString) {
    if (!jsonString.Name) {
      throw new Error('Could not parse SubGroup name')
    }
    if (!jsonString.Hooks || !Array.isArray(jsonString.Hooks)) {
      throw new Error('Could not parse SubGroup hooks')
    }
  }

}
