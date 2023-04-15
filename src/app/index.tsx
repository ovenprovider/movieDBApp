// Libraries
import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'

// Components
import { SearchBar, MovieList, SearchIcon, Dropdown } from '../components'

// Utils
import { fetchData, omdbSearchURL, transformMovieData } from '../utils'

// Styles
import styles from './(styles)/index.scss'

// Types
import { type SearchType, type MoviesSearchResponse, type TransformedMovieData } from '../@types'

const NUMBER_OF_COLUMNS_TO_DISPLAY = 2
const GENERIC_ERROR_MESSAGE = 'No results, please try another search term.'

const DropdownItems = [
  { label: 'Movie', value: 'movie' },
  { label: 'Series', value: 'series' },
  { label: 'Episode', value: 'episode' }
]

const Home = () => {
  const [searchTitle, setSearchTitle] = useState('')
  const [searchYear, setSearchYear] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('movie')

  const [previousSearchTitle, setPreviousSearchTitle] = useState('')
  const [previousSearchYear, setPreviousSearchYear] = useState('')
  const [previousSearchType, setPreviousSearchType] = useState<SearchType>('movie')

  const [page, setPage] = useState(1)

  const [showDropdownMenu, setShowDropdownMenu] = useState(false)
  const [hideLoadMoreButton, setHideLoadMoreButton] = useState(true)

  const [isLoading, setIsLoading] = useState(false)
  const [isNewSearch, setIsNewSearch] = useState(false)

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR_MESSAGE)

  const [movies, setMovies] = useState<TransformedMovieData[]>([])

  const resetUIState = () => {
    setPage(1)
    setHideLoadMoreButton(true)
    setMovies([])
    setIsError(false)
    setErrorMessage(GENERIC_ERROR_MESSAGE)
  }

  const handleOnLoadMorePress = () => {
    setIsLoading(true)
  }

  const handleOnSubmit = () => {
    if (!searchTitle) {
      setIsError(true)
      setErrorMessage('Please enter a title.')
      return
    }

    resetUIState()
    setIsLoading(true)
    setIsNewSearch(true)
  }

  const handleYearSearchBarOnChangeText = (text: string) => {
    const regex = /[^0-9]/
    if (regex.test(text)) return
    setSearchYear(text)
  }

  const handleGetMoviesData = () => {
    fetchData(
      omdbSearchURL(
        isNewSearch
          ? { title: searchTitle, page: 1, type: searchType, year: searchYear }
          : { title: previousSearchTitle, page, type: previousSearchType, year: searchYear }
      )
    )
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
        // Should never reach here realistically, but you know
        console.error(e)
      })
  }

  useEffect(() => {
    if (isNewSearch) {
      handleGetMoviesData()
      setPreviousSearchTitle(searchTitle)
      setPreviousSearchType(searchType)
      setPreviousSearchYear(searchYear)
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
          <View style={styles.titleSearchBar}>
            <SearchBar
              textInputValue={searchTitle}
              placeholderText="Search by title"
              onChangeText={(text: string) => {
                setSearchTitle(text)
              }}
              onSubmitEditing={handleOnSubmit}
            />
          </View>
          <View style={styles.yearSearchBar}>
            <SearchBar
              textInputValue={searchYear}
              placeholderText="Year"
              onChangeText={handleYearSearchBarOnChangeText}
              onSubmitEditing={handleOnSubmit}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Dropdown
              items={DropdownItems}
              open={showDropdownMenu}
              setOpen={setShowDropdownMenu}
              value={searchType}
              setValue={setSearchType}
            />
          </View>
        </View>
        <View style={styles.searchIconContainer}>
          <SearchIcon onPress={handleOnSubmit} />
        </View>
      </View>
      <SafeAreaView style={styles.movieList}>
        {isError && <Text style={styles.movieListSearchErrorText}>{errorMessage}</Text>}
        <MovieList
          movies={movies}
          hideLoadMoreButton={hideLoadMoreButton}
          isLoading={isLoading}
          onLoadMoreButtonPress={handleOnLoadMorePress}
          numberOfColumns={NUMBER_OF_COLUMNS_TO_DISPLAY}
        />
      </SafeAreaView>
    </View>
  )
}

export default Home
