import { DarkTheme, DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import React, { Ref, useEffect, useState } from 'react';
import LoginScreen from './screens/login/LoginScreen';
import HomeScreen from './screens/home/HomeScreen';
import auth from '@react-native-firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContainer from './utils/DrawerContainer';
import ProfileScreen from './screens/profile/ProfileScreen';
import NewsScreen from './screens/news/NewsScreen';
import SettingsScreen from './screens/settings/SettingsScreen';
import { UserProvider } from './utils/contexts/UserContext';
import { DefaultTheme as DefaultPaperTheme, DarkTheme as DarkPaperTheme, Provider as PaperProvider } from 'react-native-paper';
import { DarkThemeContext, DarkThemeProvider } from './utils/contexts/DarkThemeContext';

interface State {
  useDark: boolean;
}

const App = () => {
  var initialRoute = 'Home';
  // If user is not logged in, we show login screen
  if (auth().currentUser == null) {
    initialRoute = 'Login';
  }

  const Drawer = createDrawerNavigator();


  return (
    <UserProvider>
      <DarkThemeProvider>
        <DarkThemeContext.Consumer>
          {({isDarkTheme, toggleDarkTheme}) => {
            return (
                <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
                  <PaperProvider theme={isDarkTheme ? DarkPaperTheme : DefaultPaperTheme}>
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
          }}
        </DarkThemeContext.Consumer>
      </DarkThemeProvider>
    </UserProvider>
  );
}



export default App;