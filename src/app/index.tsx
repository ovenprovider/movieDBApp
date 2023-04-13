// Libraries
import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image } from 'react-native'

// Components
import { SearchBar } from '../components/SearchBar'
import { MovieList } from '../components/MovieList'

// Utils
import { fetchData } from '../utils/fetch.utils'
import { omdbSearchURL } from '../utils/url.utils'
import { transformMovieData } from '../utils/transformers.utils'

// Styles
import styles from './(styles)/index.scss'

// Types
import { type MoviesSearchResponse } from '../@types/omdbAPIResponse'
import { type TransformedMovieData } from '../@types/transformedResponses'

const Home = () => {
  const [searchBarInputValue, setSearchBarInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hideLoadMoreButton, setHideLoadMoreButton] = useState(true)
  const [isNewSearch, setIsNewSearch] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('No results, please try another search term.')

  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState<TransformedMovieData[]>([])

  const resetUIState = () => {
    setPage(1)
    setHideLoadMoreButton(true)
    setMovies([])
    setIsError(false)
    setErrorMessage('No results, please try another search term.')
  }

  const handleSearchBarOnChangeText = (text: string) => {
    setSearchBarInputValue(text)
    return text
  }

  const handleOnLoadMorePress = () => {
    setIsLoading(true)
  }

  const handleOnSubmitEditting = () => {
    resetUIState()
    setIsLoading(true)
    setIsNewSearch(true)
  }

  const handleGetMoviesData = () => {
    fetchData(omdbSearchURL(searchBarInputValue, page))
      .then((data: MoviesSearchResponse) => {
        if (data.Response === 'False') {
          setIsError(true)
          setErrorMessage(data.Error)
        } else {
          const transformedMoviesData = transformMovieData(data.Search)
          setHideLoadMoreButton(movies.length + data.Search.length >= data.totalResults)
          setPage(page + 1)
          setMovies(isNewSearch ? transformedMoviesData : movies.concat(transformedMoviesData))
        }

        setIsNewSearch(false)
        setIsLoading(false)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    if (isNewSearch) {
      handleGetMoviesData()
    }
  }, [isNewSearch])

  useEffect(() => {
    if (!isNewSearch && isLoading) {
      handleGetMoviesData()
    }
  }, [isLoading])

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            textInputValue={searchBarInputValue}
            placeholderText="Search by title"
            onChangeText={handleSearchBarOnChangeText}
            onSubmitEditing={handleOnSubmitEditting}
          />
        </View>
        <View style={styles.searchIcon}>
          <Image
            style={styles.searchIcon}
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEU0lEQVRoQ+2ZWahVVRjHtUEcSi0DzahwKqdCbXgII4gk0hweRKzwITRNUHNAUksMzAohGh+yyIn0TVBTXywFU1PUypxQQ1GsiDItMyvL+v1kn7ht9jlnrX3OPZwLffBjn3vPWt9a/7XX8H3rNG/WxK15E+9/s2oKaM1gXANXwy/wUy0GpxIB19PBR2E43AM3pzp8lr/3wXpYDYcbQ1AeAbfTkRdhBFzVoFPf8vlH+AMU1zl5G4Uie/kwFz6sppAYAe1o+BUYl3Tczq6DNfAR/JzqmFPJNzMsEatw7ROYDAqq2EIFdKOltdAbzsPb8FJGp0t16CG+fA36wm/wFHxQqYIQAffTiHPYafExPAHf5WzYt/I8OJW0eTA/p6/L1coJ6EqZnXADvAuT4GIlDSZ1R/JcCm3gaViU12cpAW1xuh36wFswJW8jReoN4v8b4G94GDbn8V9KwHs4dMFuhMHwZ54GytRxUN6AU3AbXIhto5gAF+uX4IHUHX6IdRxR3nPCAZoN7nJRVkyAi9YDag68HOUxvvAdVPkczoG7ndtzsGUJ6Ejtb5JR78Lz12Bv+Qsup+oYmAavx7jJEuD+7I7jGhgf46yCsm7VW+BTuC/GT5YAT9chYJzj/KyFXZG88Wt5doD0qV60D1kCvqf0daCz6F2hArWFxezb2BrqJy2gPRXPwDFwQdXSXqWx6fAkLA1tOC3ARWvnd8G9oU6qVM4db0EiwpgpyNICelDrCEQvpqDWSheaydcL4dnkGeQyLeBGarmFHgCjxlqaQZ2B3kR4J7ThtIArqejp+xe4iI1TamUraOhxcAc0RgqyrF3oM2r2B0/I/UFeqlPoEG56ghHw8VCXWQJMF59LXqeLqhZmPn0y4daYBrME3I0Dd6HdYEpYC3PhGsiZ6ZluBluWAP/3VfIqjdnNdxvTvIo5CsZgDp5TONiKRaMGVgZYJt4D4FKwx/iCL1DF1HIVmKlFWTEBxiZ7oB88A29GeQ0vbN5hytoS3Laj745KZWQDcbgJLPMIVHsqGbTZeUMWcw5P4mgrl9RPwKOHikmG+/OO6BayK3jD4X2Sg2QY/SB49kRbOQE6NMFwGlXrLqcXvrxjMlU9Dd6pDgWvbKItRIBO3ea8yHJtrASP/ODDJumVHZ0Ks8BT3n3/luQ7sz5v8KJFhAqwHUdpCTh3fwcztvfhizLD1onvH4MZcBM4VZbBaFBUwRRhG667YIsRoFPvRx1Bp1SrpJWveW4DdxCnhBdfJkSG5nfBneCb07zYtf5BMHEx5vEcKFj0m4gVUGjIm+exMArKRa1eQzrnF0N6E6hYRF4BDQbt8gnqeeHFlHO7BXhFcgIMyw3SSllFIqohoEz/gr7OLaJeBKgyl4h6EpBLRL0JiBZRjwKiRNSrgGAR9SxAEQZ5Hn4NT2yDvwcKe1u9C0i/Ca/h/bHw3yv4piCgIMILBn+b/s/vB01FQNHT8H8BQYFCIxb6B7quzDGJddU4AAAAAElFTkSuQmCC'
            }}
          />
        </View>
      </View>
      <SafeAreaView style={styles.movieList}>
        {isError && <Text style={styles.movieListSearchErrorText}>{errorMessage}</Text>}
        <MovieList
          movies={movies}
          hideLoadMoreButton={hideLoadMoreButton}
          isLoading={isLoading}
          onLoadMoreButtonPress={handleOnLoadMorePress}
        />
      </SafeAreaView>
    </View>
  )
}

export default Home
