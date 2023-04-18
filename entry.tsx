// Taken from 'expo-router/entry' so we can change the default location of /app
// Libraries
import '@expo/metro-runtime'
import { ExpoRoot } from 'expo-router'
import Head from 'expo-router/head'
import { renderRootComponent } from 'expo-router/src/renderRootComponent'

// Contexts
import { FavouritesProvider } from './src/contexts'

// This is handled by the expo library but it is written in JS and not TS. I've typed this as 'any'
// because this value is handled by the library itself + the environment
const EXPO_ROPUTER_IMPORT_MODE: any = process.env.EXPO_ROUTER_IMPORT_MODE

const ctx = require.context(__dirname + '/src/app', true, /.*/, EXPO_ROPUTER_IMPORT_MODE)
// Must be exported or Fast Refresh won't update the context
export function App() {
  return (
    <FavouritesProvider>
      <Head.Provider>
        <ExpoRoot context={ctx} />
      </Head.Provider>
    </FavouritesProvider>
  )
}

renderRootComponent(App)
