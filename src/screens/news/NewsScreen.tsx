import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import NewsPagedList from '../news/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LocaleContext from '../../utils/language/LanguageContext';

export default function NewsScreen({navigation}: StackScreenProps<NavigationParams, 'Home'>) {
    const {t} = React.useContext(LocaleContext);
    return (
        <Scaffolding title={t('title_news')}>
            <NewsPagedList 
                path="news"
                orderedBy="date"
                />
        </Scaffolding>
    );
};