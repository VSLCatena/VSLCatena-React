import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import NewsPagedList from '../news/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';

export default function HomeScreen({navigation}: StackScreenProps<any, 'Home'>) {
    return (
        <Scaffolding title="V.S.L. Catena - Home">
            <NewsPagedList path="news" orderedBy="date" />
        </Scaffolding>
    )
};