// Libraries
import {
  TextInput,
  type KeyboardTypeOptions,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData
} from 'react-native'

// Styles
import styles from './styles/SearchBar.scss'

type Props = {
  textInputValue: string
  placeholderText: string
  onChangeText: (text: string) => void
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void
  onSubmitEditing?: () => void
  keyboardType?: KeyboardTypeOptions
  maxLength?: number
}

export const SearchBar: React.FC<Props> = ({
  onChangeText,
  textInputValue,
  onKeyPress,
  onSubmitEditing,
  placeholderText,
  keyboardType = 'default',
  maxLength
}) => {
  return (
    <TextInput
      style={styles.container}
      placeholder={placeholderText}
      value={textInputValue}
      onKeyPress={onKeyPress}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  )
}
