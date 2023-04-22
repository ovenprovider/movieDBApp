// Libraries
import { ScrollView, Text } from 'react-native'

// Loader
import { Loader } from '../../../components'

// Styles
import { styles } from './(styles)/MoviePlot.styles'

type Props = {
  isLoading: boolean
  isError: boolean
  errorMessage: string
  moviePlot: string
}

export const MoviePlot: React.FC<Props> = ({ isLoading, isError, errorMessage, moviePlot }) => {
  return (
    <>
      <Text style={styles.moviePlotLabelText}>{isError ? errorMessage : 'Plot'}</Text>
      <ScrollView style={styles.moviePlotTextContainer}>{isLoading ? <Loader /> : <Text>{moviePlot}</Text>}</ScrollView>
    </>
  )
}
