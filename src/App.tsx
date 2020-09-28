import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';
import React from 'react';
import LoginScreen from './screens/login/LoginScreen';
import HomeScreen from './screens/home/HomeScreen';
import auth from '@react-native-firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContainer from './utils/DrawerContainer';
import ProfileScreen from './screens/profile/ProfileScreen';
import NewsScreen from './screens/news/NewsScreen';
import { ThemeProvider } from 'react-native-elements';


const App = () => {

  var initialRoute = 'Home';
  // If user is not logged in, we show login screen
  if (auth().currentUser == null) {
    initialRoute = 'Login';
  }

  const Drawer = createDrawerNavigator();
  const scheme = useColorScheme();

  return (
    <ThemeProvider useDark={scheme === 'dark'}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator drawerContent={props => <DrawerContainer {...props} />} initialRouteName={initialRoute}>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="News" component={NewsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
