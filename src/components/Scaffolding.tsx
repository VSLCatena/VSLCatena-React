import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import Color from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export interface Props {
    title?: string,
}
const Scaffolding: React.FC<Props> = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{flex: 1}}>
            <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', backgroundColor: Color.surface, elevation: 10}}>
                <Pressable onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                    <Icon style={{ padding: 10 }} name="menu" size={30} color={Color.onSurface}  />
                </Pressable>
                <Text style={{fontSize: 20, marginStart: 10, fontWeight: 'bold',}}>{props.title ?? ""}</Text>
            </View>
            <View style={{flexGrow: 1, backgroundColor: Color.background}}>
                {props.children}
            </View>
        </View>
    );
}


export default Scaffolding;