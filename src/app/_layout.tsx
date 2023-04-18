// Libraries
import { Stack } from 'expo-router'

// Components
import { Drawer, MenuIcon } from '../components'
/*
const MainStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Movies',
          headerTitleAlign: 'center',
          headerRight: (props) => <MenuIcon size={24} />
        }}
      />
      <Stack.Screen
        name="details/index"
        // @ts-expect-error needs to be properly typed
        options={(props) => ({
          headerShown: true,
          title: props.route.params?.movieTitle,
          headerTitleAlign: 'left'
        })}
      />
      <Stack.Screen
        name="favourites/index"
        options={{
          headerShown: true,
          title: 'Favourites',
          headerTitleAlign: 'left'
        }}
      />
    </Stack>
  )
}
*/
const RootLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          title: 'Search',
          drawerLabel: 'Search',
          headerTitleAlign: 'center'
        }}
      />
      <Drawer.Screen
        name="favourites/index"
        options={{
          title: 'Favourites',
          headerTitleAlign: 'center'
        }}
      />
      <Drawer.Screen
        name="details/index"
        options={{
          title: 'Details',
          // @TODO: find the proper way to remove this from the drawer, this is just a little FE hack
          drawerItemStyle: { display: 'none' },
          headerTitleAlign: 'center'
        }}
      />
    </Drawer>
  )
}

export default RootLayout
