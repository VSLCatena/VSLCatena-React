import * as React from 'react';
const useState = React.useState;
import Scaffolding from '../../components/Scaffolding';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../../NavigationParams';
import { Text } from 'react-native-paper';
import LocaleContext from '../../language/LanguageContext';
import User from '../../../data/database/user/model/User';
import StorageImage from '../../components/StorageImage';
import { View } from 'react-native';
import Role from '../../../data/database/user/model/Role';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CommitteeComponent from '../committees/components/CommitteeComponent';

export default function ProfileScreen({navigation, route}: StackScreenProps<NavigationParams, 'Login'>) {
    const {t} = React.useContext(LocaleContext);

    const params = route.params;
    if (params == null || params['user'] == null) {
        navigation.goBack();
        return (<></>);
    }

    var user = params['user'] as User;

    return (
        <Scaffolding title={t('title_profile', user.name)}>
            <FlatList
                contentContainerStyle={{ padding: 16 }}
                data={ user.committees }
                ListHeaderComponent={
                    <View>
                        <View style={{ flexDirection: 'row', paddingBottom: 16 }}>
                            <StorageImage reference={user?.getImageReference()} style={{ width: 150, height: 150, borderRadius: 20 }} />
                            <View style={{ paddingStart: 16 }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{user.name}</Text>
                                <Text>Maybe last online</Text>
                                <Text>Maybe joined since</Text>
                            </View>
                        </View>
                        { ((user.committees.length > 0) ? (<Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>{t('title_committees')}</Text>) : null) }
                    </View>
                }
                renderItem={(item) => 
                    <View style={{ marginTop: 8, marginBottom: 8, }}>
                        <CommitteeComponent {...item.item} />
                    </View> } />
        </Scaffolding>
    )
};