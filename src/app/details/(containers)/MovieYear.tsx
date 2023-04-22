// Libraries
import { View, Text } from 'react-native'

// Styles
import { styles } from './(styles)/MovieYear.styles'

type Props = {
  movieYear: string | undefined
}

export const MovieYear: React.FC<Props> = ({ movieYear }) => {
  return (
    <View style={styles.movieYearContainer}>
      <Text style={styles.movieYearText}>Year: {movieYear}</Text>
    </View>
  )
}
