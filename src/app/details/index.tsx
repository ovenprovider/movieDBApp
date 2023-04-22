// Libraries
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useRouter, useSearchParams } from 'expo-router'

// Contaienrs
import { MovieDirector, MoviePlot, MovieYear, StarRatingsContainer, MoviePosterContainer } from './(containers)'

// Utils
import { omdbURLSearchByID, fetchData } from '../../utils'

// Types
import { type MovieDetailsResponse } from '../../@types'

// Styles
import { styles } from './(styles)/index.styles'

type DetailsRouteParams = {
  movieYear: string
  moviePosterURL: string
  movieimdbID: string
}

const handleImdbRating = (imdbRating: string) => {
  if (imdbRating !== 'N/A') {
    const parsedImdbRating = Number.parseFloat(imdbRating)
    if (parsedImdbRating >= 0 && parsedImdbRating <= 10) {
      // Convert to a 5 star rating
      return parsedImdbRating
    }
  }
  return -1
}

const Details = () => {
  const router = useRouter()
  const params = useSearchParams<DetailsRouteParams>()

  const [movieDirector, setMovieDirector] = useState('')
  const [moviePlot, setMoviePlot] = useState('')
  const [imdbRating, setImdbRating] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const [errorMessage, setErrorMessage] = useState('Failed to load details')

  const { movieYear, moviePosterURL, movieimdbID } = params

  const handleGetMoviesDetailsData = () => {
    // In the occasion there is no imdb provided, we will return to the previous screen as to not waste a call
    if (!movieimdbID) {
      router.back()
      return
    }

    fetchData(omdbURLSearchByID(movieimdbID))
      .then((data: MovieDetailsResponse) => {
        if (data.Response === 'False') {
          setIsError(true)
          setErrorMessage(data.Error)
          return
        }

        setMovieDirector(data.Director)
        setMoviePlot(data.Plot)
        setImdbRating(handleImdbRating(data.imdbRating))
        setIsLoading(false)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    handleGetMoviesDetailsData()
  }, [])

  return (
    <View style={styles.container}>
      <MoviePosterContainer uri={moviePosterURL} />
      <View style={styles.movieYearandRatingsContainer}>
        <MovieYear movieYear={movieYear} />
        <StarRatingsContainer imdbRating={imdbRating} />
      </View>
      <MovieDirector isLoading={isLoading} movieDirector={movieDirector} />
      <MoviePlot isLoading={isLoading} isError={isError} errorMessage={errorMessage} moviePlot={moviePlot} />
    </View>
  )
}

export default Details
