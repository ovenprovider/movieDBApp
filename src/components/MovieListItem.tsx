// Libraries
import { Image, View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'

// Styles
import styles from './styles/MovieListItem.scss'

type Props = {
  movieTitle: string
  movieYear: string
  moviePosterURL: string
  movieimdbID: string
  removeTopMargin?: boolean
}

export const MovieListItem: React.FC<Props> = ({
  movieTitle,
  movieYear,
  moviePosterURL,
  movieimdbID,
  removeTopMargin
}) => {
  const router = useRouter()
  const encodedMoviePosterURL = encodeURIComponent(moviePosterURL)
  const [isImageError, setIsImageError] = useState(false)

  const handleOnPress = () => {
    router.push({
      pathname: 'details',
      params: { movieTitle, movieYear, moviePosterURL: encodedMoviePosterURL, movieimdbID }
    })
  }

  return (
    <Pressable style={[styles.container, removeTopMargin ? { marginTop: 0 } : {}]} onPress={handleOnPress}>
      {!isImageError ? (
        <Image
          style={styles.poster}
          resizeMode="stretch"
          source={{ uri: moviePosterURL }}
          onError={() => {
            setIsImageError(true)
          }}
        />
      ) : (
        <View style={styles.posterError}>
          <Text>Image failed to load</Text>
        </View>
      )}

      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitleText}>{movieTitle}</Text>
        <Text>{movieYear}</Text>
      </View>
    </Pressable>
  )
}
