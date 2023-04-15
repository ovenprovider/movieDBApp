// Libraries
import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, Platform, TouchableWithoutFeedback } from 'react-native'
import { useRouter, useSearchParams } from 'expo-router'

// Components
import { Loader, StarRatings } from '../../components'

// Styles
import styles from './(styles)/index.scss'

// Utils
import { omdbURLSearchByID, fetchData } from '../../utils'

// Types
import { type MovieDetailsResponse } from '../../@types'

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
  const [imdbRating, setImdbRating] = useState(0)
  const [showStarRatings, setShowStarRatings] = useState(true)

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

          const parsedImdbRating = Number.parseFloat(data.imdbRating)
          if (parsedImdbRating >= 0 && parsedImdbRating <= 10) {
            // Convert to a 5 star rating
            setImdbRating(parsedImdbRating)
          }
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
      <View style={styles.movieYearandRatingsContainer}>
        <View style={styles.movieYearContainer}>
          <Text style={styles.movieYearText}>Year: {movieYear}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowStarRatings(!showStarRatings)
          }}
        >
          <View style={styles.imdbRatingsContainer}>
            <Text style={styles.imdbRatingsLabelText}>IMDB Rating:</Text>
            <View style={styles.imdbRatings}>
              {showStarRatings ? (
                <StarRatings size={16} rating={imdbRating / 2} />
              ) : (
                <Text style={styles.imdbRatingText}>{imdbRating} out of 10</Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {isLoading ? <Loader /> : <Text style={styles.movieDirectorText}>Director: {movieDirector}</Text>}
      <Text style={styles.plotLabelText}>{isError ? errorMessage : 'Plot'}</Text>
      <ScrollView style={styles.plotTextContainer}>{isLoading ? <Loader /> : <Text>{moviePlot}</Text>}</ScrollView>
    </View>
  )
}

export default Details
