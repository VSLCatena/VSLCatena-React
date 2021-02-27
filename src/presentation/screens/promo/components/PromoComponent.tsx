import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from "react-native";
import { Card, Text } from 'react-native-paper';
import Promo from '../../../../data/database/promo/model/Promo';
import StorageImage from '../../../components/StorageImage';

const PromoComponent: React.FC<Promo> = (props) => {
    const navigation = useNavigation();

    return (
        <Card style={{ marginTop: 8, marginBottom: 8, marginStart: 16, marginEnd: 16, }}>
            <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                <StorageImage reference={props.user.getImageReference()} style={{ width: 50, height: 50, }} />
                 <View style={{flexDirection: 'column', padding: 8 }}>
                    <Text style={{ fontSize: 16 }}>{props.title}</Text>
                    <Text onPress={() => {navigation.navigate('Profile', {user: props.user})}}>{props.user.name}</Text>
                    <Text>{props.date.toISOString()}</Text>
                </View>
            </Card.Content>
            <Card.Content>
                <Text>{props.content}</Text>
            </Card.Content>
        </Card>
    );
};

export default PromoComponent;