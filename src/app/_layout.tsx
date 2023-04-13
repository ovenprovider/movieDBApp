import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Movies',
          headerTitleAlign: 'center'
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
    </Stack>
  )
}

export default RootLayout
