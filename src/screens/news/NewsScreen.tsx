import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import NewsPagedList from '../news/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';

export default function NewsScreen({navigation}: StackScreenProps<NavigationParams, 'Home'>) {
    return (
        <Scaffolding title="V.S.L. Catena - Nieuws">
            <NewsPagedList path="news" orderedBy="date" />
        </Scaffolding>
    )
};