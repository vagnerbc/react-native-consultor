import deepmerge, { Options } from 'deepmerge'

import { isJsonString } from './strings'

export function deepMerge(target: any, source: any, options?: Options): any {
  const newTarget = { ...target }
  const newSource = { ...source }
  return deepmerge(newTarget, newSource, options)
}

export function parseStringAttributestoJSON(data: any) {
  const newData = { ...data }
  const parsed: any = {}

  Object.keys(newData).forEach(key => {
    if (isJsonString(newData[key])) {
      parsed[key] = JSON.parse(newData[key])
    }
  })

  return {
    ...newData,
    ...parsed
  }
}
