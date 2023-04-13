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
}

const renderItem = ({ item: { Title, Year, PosterURL, imdbID } }: { item: TransformedMovieData }) => {
  return <MovieListItem movieTitle={Title} movieYear={Year} moviePosterURL={PosterURL} movieimdbID={imdbID} />
}

export const MovieList: React.FC<Props> = ({ movies, onLoadMoreButtonPress, hideLoadMoreButton, isLoading }) => {
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
        numColumns={2}
        data={movies}
        renderItem={renderItem}
        horizontal={false}
      />
    </>
  )
}
