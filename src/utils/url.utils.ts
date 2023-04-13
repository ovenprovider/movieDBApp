import { OMBD_URL } from '@env'

export const omdbSearchURL = (title: string, page: number, year?: number) => {
  const url = `${OMBD_URL}&s=${title}&page=${page}&type=movie`
  return year ? `${url}&y=${year}` : url
}

export const omdbURLSearchByID = (IMDbID: string) => {
  return `${OMBD_URL}&i=${IMDbID}&plot=full`
}
