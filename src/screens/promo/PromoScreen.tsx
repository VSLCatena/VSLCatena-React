import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LocaleContext from '../../utils/language/LanguageContext';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Combiner';
import Role from '../../models/Role';
import PromoPagedList from './PromoPagedList';

export default function PromoScreen({navigation}: StackScreenProps<NavigationParams, 'Promo'>): React.ReactElement {
    const {t} = React.useContext(LocaleContext);
    const userRole = useSelector((state: RootState) => state.user).userRole;

    return (
        <Scaffolding title={t('title_promo')}>
            <PromoPagedList 
                path="promo"
                orderedBy="date"
                />
            <FAB
                visible={userRole > Role.MODERATOR}
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