import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    marginTop: 8,
    padding: 8
  },
  movieTitleContainer: {
    marginTop: 4
  },
  movieTitleText: {
    fontSize: 16,
    textAlign: 'left'
  },
  poster: {
    height: 260
  },
  posterError: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addToFavouritesText: {
    marginTop: 4,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
