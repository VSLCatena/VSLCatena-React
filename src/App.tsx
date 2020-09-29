import { DarkTheme, DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import React from 'react';
import LoginScreen from './screens/login/LoginScreen';
import HomeScreen from './screens/home/HomeScreen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContainer from './utils/DrawerContainer';
import ProfileScreen from './screens/profile/ProfileScreen';
import NewsScreen from './screens/news/NewsScreen';
import SettingsScreen from './screens/settings/SettingsScreen';
import { DefaultTheme as DefaultPaperTheme, DarkTheme as DarkPaperTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer, RootState } from './redux/Combiner';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { setDarkMode } from './redux/darkmode/Actions';
import { updateUser } from './redux/user/Actions';
import { DARK_MODE_STORAGE_KEY } from './redux/darkmode/Reducers'
import { DocumentSnapshot } from './utils/TypeAliases';
import User from './models/User';



const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <StoreProvider store={store}>
      <AppNav />
    </StoreProvider>
  );
}

const AppNav = () => {
  var initialRoute = 'Home';
  // If user is not logged in, we show login screen
  if (auth().currentUser == null) {
    initialRoute = 'Login';
  }

  const Drawer = createDrawerNavigator();
  const darkMode = useSelector((state: RootState) => state.darkMode);

  return (
    <NavigationContainer theme={darkMode.useDarkMode ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={darkMode.useDarkMode ? DarkPaperTheme : DefaultPaperTheme}>
        <Drawer.Navigator drawerContent={props => <DrawerContainer {...props} />} initialRouteName={initialRoute}>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="News" component={NewsScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    </PaperProvider>
  </NavigationContainer>
  )
}

// Dark theme
AsyncStorage.getItem(DARK_MODE_STORAGE_KEY).then((isDarkTheme) => {
  if (isDarkTheme == null) return;
  store.dispatch(setDarkMode(isDarkTheme === 'true'));
});



// Update user
auth().onUserChanged((user) => {
  if (user == null) {
    store.dispatch(updateUser(null))
    return;
  }

  firestore().doc("users/"+(user.uid)).get()
      .then((snapshot: DocumentSnapshot) => {
        store.dispatch(updateUser(User.fromSnapshot(snapshot)));
      });
});


export default App;