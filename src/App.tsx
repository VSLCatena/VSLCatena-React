import { DarkTheme, DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import React from 'react';
import LoginScreen from './screens/login/LoginScreen';
import HomeScreen from './screens/home/HomeScreen';
import auth from '@react-native-firebase/auth';
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
import { setupDarkModeStore } from './redux/darkmode/Reducers';
import { createStackNavigator } from '@react-navigation/stack';
import { setupUserStore } from './redux/user/Reducers';
import LanguageProvider from './utils/language/LanguageProvider';



const store = createStore(rootReducer, applyMiddleware(thunk));
setupDarkModeStore(store);
setupUserStore(store);

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
  const Stack = createStackNavigator();
  const darkMode = useSelector((state: RootState) => state.darkMode);

  return (
    <LanguageProvider>
      <PaperProvider theme={darkMode.useDarkMode ? DarkPaperTheme : DefaultPaperTheme}>
        <NavigationContainer theme={darkMode.useDarkMode ? DarkTheme : DefaultTheme}>
          <Drawer.Navigator drawerType="front" drawerContent={props => <DrawerContainer {...props} />} initialRouteName={initialRoute}>
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="News" component={NewsScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </LanguageProvider>
  )
}

export default App;