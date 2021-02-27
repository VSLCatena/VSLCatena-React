import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../../NavigationParams';
import { StyleSheet, View } from 'react-native';
import LocaleContext from '../../language/LanguageContext';
import { FlatList } from 'react-native-gesture-handler';
import CommitteeComponent from './components/CommitteeComponent';
import Committee from '../../../data/database/committees/model/Committee';
import GetCommittees from '../../../data/database/committees/usecase/GetCommittees';

export default function CommitteesScreen({navigation}: StackScreenProps<NavigationParams, 'Committees'>): React.ReactElement {
    const {t} = React.useContext(LocaleContext);
    
    const [committees, setCommittees] = React.useState<Committee[]>([]);

    React.useEffect(() => {
        GetCommittees().then(it => setCommittees(it));
    })

    return (
        <Scaffolding title={t('title_committees')}>
            <FlatList
                contentContainerStyle={{ paddingVertical: 8 }}
                data={committees}
                renderItem={ item => 
                    <View style={{ marginTop: 8, marginBottom: 8, marginStart: 16, marginEnd: 16, }}>
                        <CommitteeComponent {...item.item} />
                    </View> }
                keyExtractor={item => item.id} />
        </Scaffolding>
    )
};