export function removeAttributeByKey<T>(array: T[], key: keyof T): T[] {
  const newArray = [...array]
  return newArray.map(object => ({ ...object, [key]: undefined }))
}

export function removeEmptyAttributes<T = any>(array: T[]): T[] {
  const newArray = [...array]

  return newArray.map(object => {
    const newObject = { ...object }
    const keys = Object.keys(newObject)
    const toRemove = [null, undefined, NaN, '']

    keys.forEach(key => {
      if (!toRemove.includes(newObject[key as keyof T] as any)) return
      delete newObject[key as keyof T]
    })

    return newObject
  })
}

export const findOneValue = <T>(data: T[], key: keyof T, value: unknown) => {
  return data.find(
    item =>
      String(item[key] || '').toLowerCase() === String(value).toLowerCase()
  )
}

export const compareArrays = <T>(arrayOne: T[], arrayTwo: T[]) => {
  if (arrayOne.length !== arrayTwo.length) return false

  arrayOne.forEach((value, index) => {
    if (value !== arrayTwo[index]) {
      return false
    }
  })

  return true
}

export const filterValue = <T>(data: T[], key: keyof T, value: unknown) => {
  return data.filter(item => {
    return (
      String(item[key] || '')
        .toLowerCase()
        .valueOf() === String(value).toLowerCase().valueOf()
    )
  })
}

export const filterValueIncludes = <T>(
  data: T[],
  key: keyof T,
  value: unknown
) => {
  return data.filter(item =>
    String(item[key] || '')
      .toLowerCase()
      .includes(String(value).toLowerCase())
  )
}

export const filterMultipleValues = <T>(
  data: T[],
  key: keyof T,
  values: unknown[]
) => {
  return data.filter(item => {
    const stringValues = values.map(value => String(value).toLowerCase())
    return stringValues.includes(String(item[key] || '').toLowerCase())
  })
}

export const sortValues = <T>(data: T[], compare: (a: T, b: T) => number) => {
  return [...data].sort(compare)
}
