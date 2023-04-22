import { useState } from 'react'
import { View, Text, Image } from 'react-native'

import { styles } from './(styles)/MoviePosterContainer.styles'

type Props = {
  uri: string | undefined
}

export const MoviePosterContainer: React.FC<Props> = ({ uri }) => {
  const [isImageError, setIsImageError] = useState(false)

  return !isImageError ? (
    <Image
      style={styles.moviePoster}
      resizeMode="contain"
      source={{ uri }}
      onError={() => {
        setIsImageError(true)
      }}
    />
  ) : (
    <View style={styles.moviePosterError}>
      <Text>Image failed to load</Text>
    </View>
  )
}
