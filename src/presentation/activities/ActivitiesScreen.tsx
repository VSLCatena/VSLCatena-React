import * as React from 'react';
import Scaffolding from '../components/Scaffolding';
import NewsPagedList from '../news/components/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import { StyleSheet, View } from 'react-native';
import LocaleContext from '../../utils/language/LanguageContext';
import { Appbar, Button, FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Combiner';
import ActivitiesPagedList from './components/ActivitiesPagedList';
import Role from '../../data/database/user/model/Role';

export default function ActivitiesScreen({navigation}: StackScreenProps<NavigationParams, 'Activities'>): React.ReactElement {
    const {t} = React.useContext(LocaleContext);
    const userRole = useSelector((state: RootState) => state.user).userRole;

    return (
        <Scaffolding title={t('title_activities')}>
            <ActivitiesPagedList 
                contentContainerStyle={{ paddingTop: 8, paddingBottom: 80 }}
                ListHeaderComponent={(
                    <Button 
                        mode='contained' 
                        style={styles.button} 
                        onPress={() => navigation.navigate('Topics')}
                    >{t('activities_topic_change')}</Button>
                )}
                />
            <FAB
                visible={userRole.isAtLeast(Role.MODERATOR)}
                style={styles.fab}
                icon='plus'
                onPress={() => navigation.navigate('EditActivity', { activityId: undefined })} />
        </Scaffolding>
    )
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    button: {
        margin: 16,
    }
})