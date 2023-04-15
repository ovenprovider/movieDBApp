// Env
import { OMBD_URL } from '@env'

// Types
import { type SearchType } from '../@types'

export const omdbSearchURL = (title: string, page: number, type: SearchType, year?: string) => {
  const url = `${OMBD_URL}&s=${title}&page=${page}&type=${type}`
  return year ? `${url}&y=${year}` : url
}

export const omdbURLSearchByID = (IMDbID: string) => {
  return `${OMBD_URL}&i=${IMDbID}&plot=full`
}
