import type { GenericError, MovieDetailsResponse, MoviesSearchResponse } from '../@types'

type Response = MoviesSearchResponse & MovieDetailsResponse & GenericError

const genericError: GenericError = {
  Response: 'False',
  Error: 'API response error'
}

export const fetchData = async (url: string): Promise<Response> => {
  const response = await fetch(url)

  if (response.status < 200 || response.status > 299) {
    return genericError
  }

  return await response.json()
}
