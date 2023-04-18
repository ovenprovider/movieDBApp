// Libraries
import { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

// Components
import { MovieList } from '../../components'

// Styles
import styles from './(styles)/index.scss'

// Types
import { type TransformedMovieData } from '../../@types'

// Contexts
import { FavouritesContext, type FavouritesContextType } from '../../contexts'

const NUMBER_OF_COLUMNS_TO_DISPLAY = 2

const Favourites = () => {
  const { favouriteMovies } = useContext<FavouritesContextType>(FavouritesContext)
  const [movies, setMovies] = useState<TransformedMovieData[]>([])
  const [page, setPage] = useState(1)
  const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false)

  useEffect(() => {
    setMovies(favouriteMovies.slice(page * 10 - 10, page * 10))
    setHideLoadMoreButton(favouriteMovies.length < 10 || movies.length < 10)
  }, [page, favouriteMovies])

  // Although we load from local storage, and can display the items, we paginate the items for better performance
  const handleOnLoadMorePress = () => {
    setPage(page + 1)
  }

  return (
    <SafeAreaView style={styles.container}>
      <MovieList
        movies={movies}
        hideLoadMoreButton={hideLoadMoreButton}
        isLoading={false}
        loadMoreOnPress={handleOnLoadMorePress}
        numberOfColumns={NUMBER_OF_COLUMNS_TO_DISPLAY}
      />
    </SafeAreaView>
  )
}

export default Favourites
