import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../../NavigationParams';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LocaleContext from '../../language/LanguageContext';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../data/redux/Combiner';
import PromoPagedList from './components/PromoPagedList';
import Role from '../../../data/database/user/model/Role';

export default function PromoScreen({navigation}: StackScreenProps<NavigationParams, 'Promo'>): React.ReactElement {
    const {t} = React.useContext(LocaleContext);
    const userRole = useSelector((state: RootState) => state.user).userRole;

    let isModerator = userRole.isAtLeast(Role.MODERATOR);

    return (
        <Scaffolding title={t('title_promo')}>
            <PromoPagedList contentContainerStyle={{ paddingTop: 8, paddingBottom: isModerator ? 80 : 8 }} />
            <FAB
                visible={isModerator}
                style={styles.fab}
                icon='plus'
                onPress={() => navigation.navigate('EditPromo', { promoId: undefined })} />
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