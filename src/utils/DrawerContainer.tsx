import * as React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Image, ScrollViewProps, View } from "react-native";
import User from '../models/User';
import FirebaseImage from '../components/FirebaseImage';
import { StackNavigationProp } from '@react-navigation/stack';
import Lang from './Lang';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { DarkThemeContext } from './contexts/DarkThemeContext';
import { UserContext } from './contexts/UserContext';
import { Text } from 'react-native-paper';

interface Props extends DrawerContentComponentProps<any> {
    navigation: StackNavigationProp<any, any>,
}

export default function DrawerContainer(props: DrawerContentComponentProps<any>) {
    const user = React.useContext(UserContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ flex: 1, alignItems: "center", padding: 16 }}>
                <Image source={require('../assets/images/logo.png')} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 0,}}>
                <FirebaseImage path={"users/"+user?.currentUser?.id+".jpg"} style={{ width: 50, height: 50, borderColor: 'black', borderWidth: 1, borderRadius: 25 }} />
                <View style={{ marginStart: 10, flex: 1}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16,}}>{ user?.currentUser?.name }</Text>
                    <Text>{ user?.currentUser?.memberNumber}</Text>
                </View>
            </View>
            <DrawerItem
                label={Lang.get('drawer_home')}
                onPress={() => { props.navigation.navigate('Home'); }} />
            <DrawerItem
                label={Lang.get('drawer_news')}
                onPress={() => { props.navigation.navigate('News'); }} />
            <DrawerItem
                label={Lang.get('drawer_settings')}
                onPress={() => { props.navigation.navigate('Settings'); }} />
        </DrawerContentScrollView>
    )
}