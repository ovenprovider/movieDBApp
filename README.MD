A simple app using OMDb API using Expo: React Native, Typescript.
Navigation follows Expo Router's file based routing

https://docs.expo.dev/get-started/installation/#expo-cli for installing expo cli

https://docs.expo.dev/get-started/installation/#expo-go-app-for-android-and-ios for testing on mobile

Instructions to run:
yarn expo install to install all the dependencies for this project
touch .env and add OMBD_URL=http://www.omdbapi.com/?apikey= with an api key

yarn start and follow the prompts in terminal
yarn android to run on android if you have android emulators setup
yarn ios to run on ios if you have simulators setup

Conventions:
  Rules for Screens/Features:
    This project follows Expo Router's file based routing, hence; any routes that need to be omitted or grouped have their folder names wrapped by parentheses. E.g (details).
    Any folder added to the app directory will appear on the sitemap and be accessible via Expo Router's routing scheme.

  Rules for Containers: 
    Any section of a screen that can be taken out and handles it's own logic (such as it's own state) should be a container, and should be given a 'Container' suffix
    Any section of a screen that is stateless can be abstracted but not given the 'Container' suffix attachment

  Rules for the use of Contexts:
    Any screen or feature that requires a state change based on another screen or feature

  Styling:
    Follows a 4px grid for spacing