// Libraries
import { Button, FlatList, View } from 'react-native'

// Components
import { MovieListItem } from './MovieListItem'

// Styles
import styles from './styles/MovieList.scss'

// Types
import { type TransformedMovieData } from '../@types/transformedResponses'

type Props = {
  movies: TransformedMovieData[]
  onLoadMoreButtonPress: () => void
  hideLoadMoreButton: boolean
  isLoading: boolean
  numberOfColumns: number
  onAddToFavouritesPress?: (movie: TransformedMovieData) => void
}

const renderItem = ({
  item: { Title, Year, PosterURL, imdbID },
  removeTopMargin,
  onAddToFavouritesPress
}: {
  item: TransformedMovieData
  removeTopMargin: boolean
  onAddToFavouritesPress: () => void
}) => {
  return (
    <MovieListItem
      key={imdbID}
      movieTitle={Title}
      movieYear={Year}
      moviePosterURL={PosterURL}
      movieimdbID={imdbID}
      removeTopMargin={removeTopMargin}
      onAddToFavouritePress={onAddToFavouritesPress}
    />
  )
}

export const MovieList: React.FC<Props> = ({
  movies,
  onLoadMoreButtonPress,
  hideLoadMoreButton,
  isLoading,
  numberOfColumns,
  onAddToFavouritesPress
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
                  !isLoading && onLoadMoreButtonPress()
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
            onAddToFavouritesPress: () => {
              onAddToFavouritesPress?.(item)
            }
          })
        }
        horizontal={false}
      />
    </>
  )
}
