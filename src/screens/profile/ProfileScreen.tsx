import * as React from 'react';
const useState = React.useState;
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import LabeledTextInput from '../../components/LabeledTextInput'
import PagedList from '../../components/PagedList';
import Scaffolding from '../../components/Scaffolding';
import NewsPagedList from '../news/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import User from '../../models/User';
import Lang from '../../utils/Lang';

export default function ProfileScreen({navigation, route}: StackScreenProps<NavigationParams, 'Login'>) {
    const params = route.params;
    if (params == null || params['user'] == null) {
        navigation.goBack();
        return (<></>);
    }

    var user = params['user'] as User;

    return (
        <Scaffolding title={Lang.get('title_profile')}>
            <Text>{user.name}</Text>
        </Scaffolding>
    )
};