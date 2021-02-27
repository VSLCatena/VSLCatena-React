import * as React from 'react';
import Scaffolding from '../components/Scaffolding';
import NewsPagedList from '../news/components/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import LocaleContext from '../../utils/language/LanguageContext';
import { FlatList } from 'react-native-gesture-handler';
import { RefreshControl } from 'react-native';

export default function HomeScreen({navigation}: StackScreenProps<any, 'Home'>) {
    const {t} = React.useContext(LocaleContext);
    const [isLoading, setLoading] = React.useState(false);

    return (
        <Scaffolding title={t('title_home')}>
            <></>
        </Scaffolding>
    )
};