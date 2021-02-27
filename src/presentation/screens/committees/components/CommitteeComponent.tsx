import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from "react-native";
import { Card, Text } from 'react-native-paper';
import Committee from '../../../../data/database/committees/model/Committee';
import { useTheme } from '@react-navigation/native';

const CommitteeComponent: React.FC<Committee> = (props) => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    
    return (
        <Card>
            <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: colors.primary, width: 20, height: 20, borderRadius: 10 }} />
                <View style={{flexDirection: 'column', padding: 8, marginStart: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{props.name}</Text>
                    { props.email ? <Text>{props.email}</Text> : null }
                </View>
            </Card.Content>
        </Card>
    );
};

export default CommitteeComponent;