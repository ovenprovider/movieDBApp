import { StyleSheet, Platform } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 16,
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'ios' ? 32 : 16
  },
  movieYearContainer: {
    marginTop: 8
  },
  movieYearandRatingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
