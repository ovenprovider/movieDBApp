import { Tabs } from 'expo-router'

const Layout = () => {
  return (
    <Tabs initialRouteName="search/index" backBehavior="history">
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          href: null
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: 'Search',
          headerTitleAlign: 'center'
        }}
      />
      <Tabs.Screen
        name="favourites/index"
        options={{
          title: 'Favourites',
          headerTitleAlign: 'center'
        }}
      />
      <Tabs.Screen
        name="details/index"
        options={{
          title: 'Details',
          headerTitleAlign: 'center',
          href: null
        }}
      />
    </Tabs>
  )
}

export default Layout
