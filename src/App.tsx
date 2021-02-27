import { DarkTheme, DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContainer from './utils/DrawerContainer';
import { DefaultTheme as DefaultPaperTheme, DarkTheme as DarkPaperTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer, RootState } from './redux/Combiner';
import thunk from 'redux-thunk';
import { setupDarkModeStore } from './redux/darkmode/Reducers';
import { setupUserStore } from './redux/user/Reducers';
import LanguageProvider from './utils/language/LanguageProvider';
import NfcHandler from './utils/NfcHandler';
import { setupDataStore } from './redux/data/Reducers';
import LoginScreen from './presentation/login/LoginScreen';
import HomeScreen from './presentation/home/HomeScreen';
import ProfileScreen from './presentation/profile/ProfileScreen';
import NewsScreen from './presentation/news/NewsScreen';
import EditNewsScreen from './presentation/news/EditNewsScreen';
import PromoScreen from './presentation/promo/PromoScreen';
import EditPromoScreen from './presentation/promo/EditPromoScreen';
import ActivitiesScreen from './presentation/activities/ActivitiesScreen';
import EditActivityScreen from './presentation/activities/EditActivityScreen';
import TopicsScreen from './presentation/activities/TopicsScreen';
import SettingsScreen from './presentation/settings/SettingsScreen';
import CommitteesScreen from './presentation/committees/CommitteesScreen';



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