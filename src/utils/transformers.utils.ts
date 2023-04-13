// Types
import { type Movie } from '../@types/omdbAPIResponse'
import { type TransformedMovieData } from '../@types/transformedResponses'

export const transformMovieData = (movies: Movie[]): TransformedMovieData[] => {
  return movies.map((movie) => ({
    Title: movie.Title,
    Year: movie.Year,
    PosterURL: movie.Poster,
    imdbID: movie.imdbID
  }))
}
