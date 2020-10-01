import * as React from 'react';
const useState = React.useState;
import Scaffolding from '../../components/Scaffolding';
import NewsPagedList from '../news/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import User from '../../models/User';
import { Text } from 'react-native-paper';
import LocaleContext from '../../utils/language/LanguageContext';

export default function ProfileScreen({navigation, route}: StackScreenProps<NavigationParams, 'Login'>) {
    const {t} = React.useContext(LocaleContext);

    const params = route.params;
    if (params == null || params['user'] == null) {
        navigation.goBack();
        return (<></>);
    }

    var user = params['user'] as User;

    return (
        <Scaffolding title={t('title_profile')}>
            <Text>{user.name}</Text>
        </Scaffolding>
    )
};