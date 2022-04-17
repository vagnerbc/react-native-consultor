export function jsonToCSV<T = any>(data: T[]): string {
  try {
    const keys = Object.keys(data[0])

    const commaSeparatedString = [
      keys.join(','),
      data.map(row => keys.map(key => (row as any)[key]).join(',')).join('\n')
    ].join('\n')

    const csvBlob = new Blob([commaSeparatedString])

    return URL.createObjectURL(csvBlob)
  } catch (error) {
    return ''
  }
}
