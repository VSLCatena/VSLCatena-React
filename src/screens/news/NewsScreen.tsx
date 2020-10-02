import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import NewsPagedList from '../news/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LocaleContext from '../../utils/language/LanguageContext';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Combiner';
import Role from '../../models/Role';

export default function NewsScreen({navigation}: StackScreenProps<NavigationParams, 'Home'>) {
    const {t} = React.useContext(LocaleContext);
    const user = useSelector((state: RootState) => state.user).currentUser;

    return (
        <Scaffolding title={t('title_news')}>
            <NewsPagedList 
                path="news"
                orderedBy="date"
                />
            <FAB
                visible={(user?.role ?? 0) > Role.MODERATOR}
                style={styles.fab}
                icon='plus'
                onPress={() => navigation.navigate('EditNews', { newsId: undefined })} />
        </Scaffolding>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})