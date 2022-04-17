export const splice = (str: string, index: number, content: string) => {
  const head = str.slice(0, index)
  const tail = str.slice(index, str.length)
  return `${head}${content}${tail}`
}

export const isJsonString = (value: any) => {
  try {
    if (
      value === null ||
      typeof value === 'number' ||
      (typeof Number(value) === 'number' && !Number.isNaN(Number(value)))
    ) {
      throw new Error()
    } else {
      JSON.parse(value)
    }
  } catch (e) {
    return false
  }
  return true
}
