// Libraries
import { Platform } from 'react-native'
import DropDownPicker, { type DropDownPickerProps } from 'react-native-dropdown-picker'

// Styles
import styles from './styles/Dropdown.scss'

// Can't type this since there's some weird issue
export const Dropdown: React.FC<DropDownPickerProps<any>> = ({ items, value, setValue, setOpen, open }) => {
  return (
    <DropDownPicker
      style={Platform.OS === 'android' ? styles.androidStyles : styles.iosStyles}
      textStyle={styles.dropdownItemText}
      arrowIconStyle={styles.icon}
      tickIconStyle={styles.icon}
      open={open}
      multiple={false}
      items={items}
      value={value}
      setValue={setValue}
      setOpen={setOpen}
    />
  )
}
