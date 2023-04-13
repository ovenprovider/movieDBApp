// Libraries
import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, Platform } from 'react-native'
import { useRouter, useSearchParams } from 'expo-router'

// Styles
import styles from './(styles)/index.scss'

// Utils
import { omdbURLSearchByID } from '../../utils/url.utils'
import { fetchData } from '../../utils/fetch.utils'

// Types
import { type MovieDetailsResponse } from '../../@types/omdbAPIResponse'
import { Loader } from '../../components/Loader'

type DetailsRouteParams = {
  movieYear: string
  moviePosterURL: string
  movieimdbID: string
}

const Details = () => {
  const router = useRouter()
  const params = useSearchParams<DetailsRouteParams>()
  const [isLoading, setIsLoading] = useState(true)
  const [isImageError, setIsImageError] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Failed to load details')
  const [movieDirector, setMovieDirector] = useState('')
  const [moviePlot, setMoviePlot] = useState('')

  const { movieYear, moviePosterURL, movieimdbID } = params

  const handleGetMoviesDetailsData = () => {
    if (!movieimdbID) {
      router.back()
      return
    }

    fetchData(omdbURLSearchByID(movieimdbID))
      .then((data: MovieDetailsResponse) => {
        if (data.Response === 'False') {
          setIsError(true)
          setErrorMessage(data.Error)
        } else {
          setMovieDirector(data.Director)
          setMoviePlot(data.Plot)
        }

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
    <View style={[styles.container, Platform.OS === 'ios' ? styles.iosContainer : styles.androidContainer]}>
      {!isImageError ? (
        <Image
          style={styles.poster}
          resizeMode="contain"
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
      <View style={styles.movieYearContainer}>
        <Text style={styles.movieYearText}>Year: {movieYear}</Text>
        {isLoading ? <Loader /> : <Text style={styles.movieDirectorText}>Director: {movieDirector}</Text>}
      </View>
      <Text style={styles.plotLabelText}>{isError ? errorMessage : moviePlot}</Text>
      <ScrollView style={styles.plotTextContainer}>{isLoading ? <Loader /> : <Text>{moviePlot}</Text>}</ScrollView>
    </View>
  )
}

export default Details
