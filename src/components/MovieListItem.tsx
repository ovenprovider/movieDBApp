import { useRouter } from 'expo-router'
import { Image, View, Text, Pressable } from 'react-native'

import styles from './styles/MovieListItem.scss'
import { useState } from 'react'

type Props = {
  movieTitle: string
  movieYear: string
  moviePosterURL: string
  movieimdbID: string
}

export const MovieListItem: React.FC<Props> = ({ movieTitle, movieYear, moviePosterURL, movieimdbID }) => {
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
    <Pressable style={styles.container} onPress={handleOnPress}>
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
