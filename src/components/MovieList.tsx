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
}

const renderItem = ({
  index,
  item: { Title, Year, PosterURL, imdbID, numberOfColumns }
}: {
  item: TransformedMovieData
  index: number
}) => {
  return (
    <MovieListItem
      movieTitle={Title}
      movieYear={Year}
      moviePosterURL={PosterURL}
      movieimdbID={imdbID}
      index={index}
      numberOfColumns={numberOfColumns}
    />
  )
}

export const MovieList: React.FC<Props> = ({ movies, onLoadMoreButtonPress, hideLoadMoreButton, isLoading, numberOfColumns }) => {
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
        renderItem={renderItem}
        horizontal={false}
      />
    </>
  )
}
