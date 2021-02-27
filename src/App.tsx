import { DarkTheme, DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContainer from './presentation/components/DrawerContainer';
import { DefaultTheme as DefaultPaperTheme, DarkTheme as DarkPaperTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer, RootState } from './data/redux/Combiner';
import thunk from 'redux-thunk';
import { setupDarkModeStore } from './data/redux/darkmode/Reducers';
import { setupUserStore } from './data/redux/user/Reducers';
import NfcHandler from './features/nfc/NfcHandler';
import { setupDataStore } from './data/redux/data/Reducers';
import LoginScreen from './presentation/screens/login/LoginScreen';
import HomeScreen from './presentation/screens/home/HomeScreen';
import ProfileScreen from './presentation/screens/profile/ProfileScreen';
import NewsScreen from './presentation/screens/news/NewsScreen';
import EditNewsScreen from './presentation/screens/news/EditNewsScreen';
import PromoScreen from './presentation/screens/promo/PromoScreen';
import EditPromoScreen from './presentation/screens/promo/EditPromoScreen';
import ActivitiesScreen from './presentation/screens/activities/ActivitiesScreen';
import EditActivityScreen from './presentation/screens/activities/EditActivityScreen';
import TopicsScreen from './presentation/screens/activities/TopicsScreen';
import SettingsScreen from './presentation/screens/settings/SettingsScreen';
import CommitteesScreen from './presentation/screens/committees/CommitteesScreen';
import LanguageProvider from './presentation/language/LanguageProvider';



const store = createStore(rootReducer, applyMiddleware(thunk));
setupDarkModeStore(store);
setupUserStore(store);
setupDataStore(store);

class App extends React.Component {
  private nfcHandler: NfcHandler = new NfcHandler();


  componentDidMount() {
    this.nfcHandler.mount();
  }

  componentWillUnmount() {
    this.nfcHandler.unmount();
  }

  render() {
    return (
      <StoreProvider store={store}>
        <AppNav />
      </StoreProvider>
    );
  }
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
    <LanguageProvider>
      <PaperProvider theme={darkMode.useDarkMode ? DarkPaperTheme : DefaultPaperTheme}>
        <NavigationContainer theme={darkMode.useDarkMode ? DarkTheme : DefaultTheme}>
          <Drawer.Navigator drawerType="front" drawerContent={props => <DrawerContainer {...props} />} initialRouteName={initialRoute}>
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="News" component={NewsScreen} />
            <Drawer.Screen name="EditNews" component={EditNewsScreen} />
            <Drawer.Screen name="Promo" component={PromoScreen} />
            <Drawer.Screen name="EditPromo" component={EditPromoScreen}/>
            <Drawer.Screen name="Activities" component={ActivitiesScreen} />
            <Drawer.Screen name="EditActivity" component={EditActivityScreen} />
            <Drawer.Screen name="Topics" component={TopicsScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Committees" component={CommitteesScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </LanguageProvider>
  )
}

export default App;