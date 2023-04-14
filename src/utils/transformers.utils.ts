// Types
import { type Movie, type TransformedMovieData } from '../@types'

export const transformMovieData = (movies: Movie[]): TransformedMovieData[] => {
  return movies.map((movie) => ({
    Title: movie.Title,
    Year: movie.Year,
    PosterURL: movie.Poster,
    imdbID: movie.imdbID
  }))
}
