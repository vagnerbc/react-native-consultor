import axios from 'axios'

export const downloadFile = async (url: string, filename: string) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'blob'
  })

  const blobURL = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')

  link.href = blobURL
  link.setAttribute('download', filename)
  link.click()
}
