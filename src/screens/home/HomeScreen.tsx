import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import NewsPagedList from '../news/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import LocaleContext from '../../utils/language/LanguageContext';

export default function HomeScreen({navigation}: StackScreenProps<any, 'Home'>) {
    const {t} = React.useContext(LocaleContext);
    return (
        <Scaffolding title={t('title_home')}>
            <NewsPagedList path="news" orderedBy="date" />
        </Scaffolding>
    )
};