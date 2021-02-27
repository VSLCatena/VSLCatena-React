import * as React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Image, ScrollViewProps, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Combiner';
import LocaleContext from './language/LanguageContext';
import StorageImage from '../presentation/components/StorageImage';

interface Props extends DrawerContentComponentProps<any> {
    navigation: StackNavigationProp<any, any>,
}

export default function DrawerContainer(props: DrawerContentComponentProps<any>) {
    const dispatcher = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user).currentUser;
    const {t} = React.useContext(LocaleContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ flex: 1, alignItems: "center", padding: 16 }}>
                <Image source={require('../assets/images/logo.png')} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 0,}}>
                <StorageImage reference={currentUser?.getImageReference() ?? ""} style={{ width: 50, height: 50, borderColor: 'black', borderWidth: 1, borderRadius: 25 }} />
                <View style={{ marginStart: 10, flex: 1}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16,}}>{ currentUser?.name }</Text>
                    <Text>{ currentUser?.memberNumber}</Text>
                </View>
            </View>
            <DrawerItem
                label={t('drawer_home')}
                onPress={() => { props.navigation.navigate('Home'); }} />
            <DrawerItem
                label={t('drawer_news')}
                onPress={() => { props.navigation.navigate('News'); }} />
            <DrawerItem
                label={t('drawer_promo')}
                onPress={() => { props.navigation.navigate('Promo'); }} />
            <DrawerItem
                label={t('drawer_activities')}
                onPress={() => { props.navigation.navigate('Activities'); }} />
            <DrawerItem
                label={t('drawer_committees')}
                onPress={() => { props.navigation.navigate('Committees'); }} />
            <DrawerItem
                label={t('drawer_settings')}
                onPress={() => { props.navigation.navigate('Settings'); }} />
        </DrawerContentScrollView>
    )
}