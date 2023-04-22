// Libraries
import { Button, FlatList, View } from 'react-native'

// Components
import { MovieListItem } from './MovieListItem'

// Styles
import { styles } from './styles/MovieList.styles'

// Types
import { type TransformedMovieData } from '../@types/transformedResponses'

type Props = {
  movies: TransformedMovieData[]
  loadMoreOnPress: () => void
  hideLoadMoreButton: boolean
  isLoading: boolean
  numberOfColumns: number
  addToFavouritesOnPress?: (movie: TransformedMovieData) => void
}

const renderItem = ({
  item: { Title, Year, PosterURL, imdbID },
  removeTopMargin,
  addToFavouritesOnPress
}: {
  item: TransformedMovieData
  removeTopMargin: boolean
  addToFavouritesOnPress: () => void
}) => {
  return (
    <MovieListItem
      key={imdbID}
      movieTitle={Title}
      movieYear={Year}
      moviePosterURL={PosterURL}
      movieimdbID={imdbID}
      removeTopMargin={removeTopMargin}
      onAddToFavouritePress={addToFavouritesOnPress}
    />
  )
}

export const MovieList: React.FC<Props> = ({
  movies,
  loadMoreOnPress,
  hideLoadMoreButton,
  isLoading,
  numberOfColumns,
  addToFavouritesOnPress
}) => {
  return (
    <>
      <FlatList
        ListFooterComponent={
          !hideLoadMoreButton ? (
            <View style={styles.loadMoreButtonContainer}>
              <Button
                title={!isLoading ? 'Load more' : 'Loading...'}
                onPress={() => {
                  !isLoading && loadMoreOnPress()
                }}
              />
            </View>
          ) : (
            <></>
          )
        }
        numColumns={numberOfColumns}
        data={movies}
        renderItem={({ item, index }) =>
          renderItem({
            item,
            removeTopMargin: index < numberOfColumns,
            addToFavouritesOnPress: () => {
              addToFavouritesOnPress?.(item)
            }
          })
        }
        horizontal={false}
      />
    </>
  )
}
