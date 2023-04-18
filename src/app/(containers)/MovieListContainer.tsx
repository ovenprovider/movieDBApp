// Libraries
import { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'

// Styles
import { styles } from '../(styles)/index.styles'

// Components
import { MovieList } from '../../components'

// Types
import { type TransformedMovieData } from '../../@types'
import { FavouritesContext } from '../../contexts'

type Props = {
  movies: TransformedMovieData[]
  loadMoreOnPress: () => void
  totalResults: number
}

const NUMBER_OF_COLUMNS_TO_DISPLAY = 2

export const MovieListContainer: React.FC<Props> = ({ movies, loadMoreOnPress, totalResults }) => {
  const { addFavouriteMovie } = useContext(FavouritesContext)
  const [isLoading, setIsLoading] = useState(false)
  const hideLoadMoreButton = movies.length >= totalResults

  const handleLoadMoreOnPress = () => {
    setIsLoading(true)
  }

  useEffect(() => {
    if (isLoading) {
      loadMoreOnPress()
    }
  }, [isLoading])

  return (
    <SafeAreaView style={styles.movieList}>
      <MovieList
        movies={movies}
        hideLoadMoreButton={hideLoadMoreButton}
        isLoading={isLoading}
        loadMoreOnPress={handleLoadMoreOnPress}
        numberOfColumns={NUMBER_OF_COLUMNS_TO_DISPLAY}
        addToFavouritesOnPress={addFavouriteMovie}
      />
    </SafeAreaView>
  )
}
