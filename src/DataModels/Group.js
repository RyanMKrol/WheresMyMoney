import { SubGroup } from './Subgroup'
import { Hook } from './Hook'

export class Group {
  constructor(jsonString, validHooks) {
    this._validateParams(jsonString)

    this.name = jsonString.Name
    this.subGroups = jsonString.SubGroups ?
      jsonString.SubGroups.map((item) => new SubGroup(item, validHooks)) :
      []
    this.miscHooks = jsonString.MiscHooks ?
      jsonString.MiscHooks.map((item) => new Hook(item, validHooks)) :
      []
  }

  _validateParams(jsonString) {
    if (!jsonString.Name) {
      throw new Error('Could not parse name of Group')
    }
  }
}
