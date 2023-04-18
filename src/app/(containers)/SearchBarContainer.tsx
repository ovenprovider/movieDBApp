// Libraries
import { useEffect, useState } from 'react'
import { View } from 'react-native'

// Components
import { Dropdown, SearchIcon, SearchBar } from '../../components'

// Styles
import { styles } from './(styles)/searchBarContainer.styles'

// Types
import { type SearchType } from '../../@types'

const DropdownItems = [
  { label: 'Movie', value: 'movie' },
  { label: 'Series', value: 'series' },
  { label: 'Episode', value: 'episode' }
]

type Props = {
  onSubmit: (searchTitle: string, searchYear: string, type: SearchType) => void
  onNewSearch: (searchTitle: string, searchYear: string, type: SearchType) => void
}

export const SearchBarContainer: React.FC<Props> = ({ onSubmit, onNewSearch }) => {
  const [searchTitle, setSearchTitle] = useState('')
  const [searchYear, setSearchYear] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('movie')

  const [isLoading, setIsLoading] = useState(false)
  const [showDropdownMenu, setShowDropdownMenu] = useState(false)

  const handleYearSearchBarOnChangeText = (text: string) => {
    const regex = /[^0-9]/
    if (regex.test(text)) return
    setSearchYear(text)
  }

  const handleOnSubmit = () => {
    onNewSearch(searchTitle, searchYear, searchType)
    setIsLoading(true)
  }

  useEffect(() => {
    if (isLoading) {
      onSubmit(searchTitle, searchYear, searchType)
      setIsLoading(false)
    }
  }, [isLoading])

  return (
    <View style={styles.container}>
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
  )
}
