import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import NewsPagedList from '../news/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import Lang from '../../utils/Lang';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function NewsScreen({navigation}: StackScreenProps<NavigationParams, 'Home'>) {
    return (
        <Scaffolding title={Lang.get('title_news')}>
            <NewsPagedList 
                path="news"
                orderedBy="date"
                />
        </Scaffolding>
    );
};