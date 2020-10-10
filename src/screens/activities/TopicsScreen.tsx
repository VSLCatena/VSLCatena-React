import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import NewsPagedList from '../news/NewsPagedList';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import { StyleSheet, View } from 'react-native';
import LocaleContext from '../../utils/language/LanguageContext';
import { Checkbox, FAB, List, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Combiner';
import Role from '../../models/Role';
import { updateTopic } from '../../redux/data/Actions';

export default function TopicsScreen({navigation}: StackScreenProps<NavigationParams, 'Topics'>): React.ReactElement {
    const {t} = React.useContext(LocaleContext);
    const user = useSelector((state: RootState) => state.user).currentUser;
    const {topics, topicSettings} = useSelector((state: RootState) => state.data);
    const dispatcher = useDispatch();

    const tagElements = topics.map((item) => {
        return (
            <List.Item 
                title={item.title}
                description={item.description}
                key={item.id}
                onPress={() => dispatcher(updateTopic(item, topicSettings[item.id] != true))}
                right={() => (<Checkbox status={topicSettings[item.id] == true ? 'checked' : 'unchecked'} />)}
                />
        )
    })

    return (
        <Scaffolding title={t('title_topics')}>
            <List.Section>
                {tagElements}
            </List.Section>
            <FAB
                visible={(user?.role ?? 0) > Role.MODERATOR}
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