// Libraries
import { useState } from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'

// Components
import { StarRatings } from '../../../components'

// Styles
import { styles } from './(styles)/StarRatingsContainer.styles'

type Props = {
  imdbRating: number
}

export const StarRatingsContainer: React.FC<Props> = ({ imdbRating }) => {
  const [showStarRatings, setShowStarRatings] = useState(false)

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        imdbRating >= 0 && setShowStarRatings(!showStarRatings)
      }}
    >
      <View style={styles.imdbRatingsContainer}>
        <Text style={styles.imdbRatingsLabelText}>IMDB Rating:</Text>
        <View>
          {showStarRatings && imdbRating >= 0 ? (
            <StarRatings size={16} rating={imdbRating / 2} />
          ) : (
            <Text style={styles.imdbRatingText}>{imdbRating >= 0 ? `${imdbRating} out of 10` : 'N/A'}</Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
