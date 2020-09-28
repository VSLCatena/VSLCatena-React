import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import NewsPagedList from '../news/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import Lang from '../../utils/Lang';

export default function HomeScreen({navigation}: StackScreenProps<any, 'Home'>) {
    return (
        <Scaffolding title={Lang.get('title_home')}>
            <NewsPagedList path="news" orderedBy="date" />
        </Scaffolding>
    )
};