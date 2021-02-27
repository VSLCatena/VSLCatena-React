import * as React from 'react';
import Scaffolding from '../components/Scaffolding';
import NewsPagedList from './components/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import { StyleSheet, View } from 'react-native';
import LocaleContext from '../../utils/language/LanguageContext';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Combiner';
import Role from '../../data/database/user/model/Role';

export default function NewsScreen({navigation}: StackScreenProps<NavigationParams, 'News'>): React.ReactElement {
    const {t} = React.useContext(LocaleContext);
    const userRole = useSelector((state: RootState) => state.user).userRole;

    let isModerator = userRole.isAtLeast(Role.MODERATOR);

    return (
        <Scaffolding title={t('title_news')}>
            <NewsPagedList contentContainerStyle={{ paddingTop: 8, paddingBottom: isModerator ? 72 : 8 }} />
            <FAB
                visible={userRole.isAtLeast(Role.MODERATOR)}
                style={styles.fab}
                icon='plus'
                onPress={() => navigation.navigate('EditNews', { newsId: undefined })} />
        </Scaffolding>
    )
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})