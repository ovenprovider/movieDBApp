type MoviesSearcSuccesshResponse = {
  Response: 'True'
  Search: Movie[]
  totalResults: number
}

type MoviesSearchErrorResponse = {
  Response: 'False'
  Error: string
}

export type MoviesSearchResponse = MoviesSearcSuccesshResponse | MoviesSearchErrorResponse

export type Movie = {
  Poster: string
  Title: string
  Type: 'movie' | 'series' | 'episode'
  Year: string
  imdbID: string
}

export type MovieDetailsResponse = MovieDetailsSuccessResponse | MovieDetailsErrorResponse

type MovieDetailsSuccessResponse = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: 'True'
}

type MovieDetailsErrorResponse = {
  Response: 'False'
  Error: string
}

type Rating = {
  Source: string
  value: string
}
