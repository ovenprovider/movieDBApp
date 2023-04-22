// Libraries
import { useState } from 'react'
import { View, Text } from 'react-native'

// Containers
import { SearchBarContainer } from './(containers)/SearchBarContainer'
import { MovieListContainer } from './(containers)/MovieListContainer'

// Utils
import { fetchData, omdbSearchURL, transformMovieData } from '../utils'

// Styles
import { styles } from './(styles)/index.styles'

// Types
import { type SearchType, type MoviesSearchResponse, type TransformedMovieData } from '../@types'

const GENERIC_ERROR_MESSAGE = 'No results, please try another search term.'

const Home = () => {
  const [previousSearchTitle, setPreviousSearchTitle] = useState('')
  const [previousSearchYear, setPreviousSearchYear] = useState('')
  const [previousSearchType, setPreviousSearchType] = useState<SearchType>('movie')

  const [page, setPage] = useState(1)

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR_MESSAGE)

  const [movies, setMovies] = useState<TransformedMovieData[]>([])
  const [totalResults, setTotalResults] = useState(0)

  const resetUIState = () => {
    setPage(1)
    setMovies([])
    setIsError(false)
    setErrorMessage(GENERIC_ERROR_MESSAGE)
  }

  const handleOnNewSearch = (searchTitle: string, searchYear: string, searchType: SearchType) => {
    resetUIState()
    setPreviousSearchTitle(searchTitle)
    setPreviousSearchYear(searchYear)
    setPreviousSearchType(searchType)
  }

  const handleGetMoviesData = (
    searchTitle: string,
    searchYear: string,
    searchType: SearchType,
    isNewSearch: boolean
  ) => {
    fetchData(omdbSearchURL({ title: searchTitle, page: 1, type: searchType, year: searchYear }))
      .then((data: MoviesSearchResponse) => {
        if (data.Response === 'False') {
          setIsError(true)
          setErrorMessage(data.Error)
          return
        }

        const transformedMoviesData = transformMovieData(data.Search)
        setTotalResults(data.totalResults)
        setPage(page + 1)
        setMovies(isNewSearch ? transformedMoviesData : movies.concat(transformedMoviesData))
      })
      .catch((e) => {
        // Should never reach here realistically, but you know
        console.error(e)
      })
  }

  return (
    <View style={styles.container}>
      <SearchBarContainer
        onSubmit={(searchTitle, searchYear, searchType) => {
          handleGetMoviesData(searchTitle, searchYear, searchType, true)
        }}
        onNewSearch={(searchTitle, searchYear, searchType) => {
          handleOnNewSearch(searchTitle, searchYear, searchType)
        }}
      />
      {isError && <Text style={styles.movieListSearchErrorText}>{errorMessage}</Text>}
      <MovieListContainer
        movies={movies}
        loadMoreOnPress={() => {
          handleGetMoviesData(previousSearchTitle, previousSearchYear, previousSearchType, false)
        }}
        totalResults={totalResults}
      />
    </View>
  )
}

export default Home
