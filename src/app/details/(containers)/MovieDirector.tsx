// Libraries
import { Text } from 'react-native'

// Components
import { Loader } from '../../../components'

// Styles
import { styles } from './(styles)/MovieDirector.styles'

type Props = {
  movieDirector: string
  isLoading: boolean
}

export const MovieDirector: React.FC<Props> = ({ movieDirector, isLoading }) => {
  return isLoading ? <Loader /> : <Text style={styles.movieDirectorText}>Director: {movieDirector}</Text>
}
