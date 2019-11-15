import { SubGroup } from './Subgroup'
import { Hook } from './Hook'

export const DEFAULT_GROUP = {
  name: "Misc",
}

export class Group {
  constructor(jsonString, context) {
    this._validateParams(jsonString)

    this.name = jsonString.Name
    this.subGroups = jsonString.SubGroups ?
      jsonString.SubGroups.map((item) => new SubGroup(item, context)) :
      []
    this.miscHooks = jsonString.MiscHooks ?
      jsonString.MiscHooks.map((item) => new Hook(item, context)) :
      []
  }

  _validateParams(jsonString) {
    if (!jsonString.Name) {
      throw new Error('Could not parse name of Group')
    }
  }

  containsEntry(csvItem) {
    for (const subGroup of this.subGroups) {
      const matchedSubGroup = subGroup.isQualifyingEntry(csvItem)
      if (matchedSubGroup) {
        return [true, matchedSubGroup]
      }
    }

    if (this.miscHooks) {
      for (const hook of this.miscHooks) {
        if (hook.hooks(csvItem)) {
          return [true, DEFAULT_GROUP]
        }
      }
    }

    return [false]
  }
}
