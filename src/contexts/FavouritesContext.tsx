// Libraries
import { createContext, useState, type PropsWithChildren } from 'react'

// Types
import { type TransformedMovieData } from '../@types'

export type FavouritesContextType = {
  favouriteMovies: TransformedMovieData[]
  addFavouriteMovie: (movie: TransformedMovieData) => void
  findFavouriteMovie: (imdbID: string) => TransformedMovieData | undefined
}

export const FavouritesContext = createContext<FavouritesContextType>({
  favouriteMovies: [],
  addFavouriteMovie: () => {},
  findFavouriteMovie: () => {
    console.warn('contexts didntl oad')
    return undefined
  }
})

export const FavouritesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [favouriteMovies, setFavouriteMovies] = useState<TransformedMovieData[]>([])

  const addFavouriteMovie = (movie: TransformedMovieData) => {
    setFavouriteMovies([...favouriteMovies, movie])
  }

  const findFavouriteMovie = (imdbID: string) => {
    return favouriteMovies.find((movie) => imdbID === movie.imdbID)
  }

  return (
    <FavouritesContext.Provider value={{ favouriteMovies, addFavouriteMovie, findFavouriteMovie }}>
      {children}
    </FavouritesContext.Provider>
  )
}
