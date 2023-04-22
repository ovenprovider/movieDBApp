// Libraries
import { View } from 'react-native'

// Components
import { Star } from './Star'

// Utils
import { convertNumberToArray } from '../utils'

// Styles
import { styles } from './styles/StarRatings.styles'

type Props = {
  size: number
  rating: number
}

const NUMBER_OF_STARS_TO_DISPLAY = 5

export const StarRatings: React.FC<Props> = ({ size, rating }) => {
  const ratingsArray = convertNumberToArray(rating, NUMBER_OF_STARS_TO_DISPLAY)

  return (
    <View style={styles.container}>
      {ratingsArray.map((fillRatio) => (
        <Star size={size} fillRatio={fillRatio} />
      ))}
    </View>
  )
}
