export const fetchData = async (url: string) => {
  const response = await fetch(url)

  if (response.status < 200 || response.status > 299) {
    return genericError
  }

  return await response.json()
}

const genericError = {
  Response: 'False',
  Error: 'API response error'
}
