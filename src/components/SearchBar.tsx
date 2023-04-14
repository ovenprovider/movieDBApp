// Libraries
import { TextInput } from 'react-native'

// Styles
import styles from './styles/SearchBar.scss'

type Props = {
  textInputValue: string
  placeholderText: string
  onChangeText: (text: string) => string
  onSubmitEditing: () => void
}

export const SearchBar: React.FC<Props> = ({ onChangeText, textInputValue, onSubmitEditing, placeholderText }) => {
  return (
    <TextInput
      style={styles.container}
      placeholder={placeholderText}
      value={textInputValue}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  )
}
