import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, useNavigation, useTheme } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export interface Props {
    title?: string,
}
const Scaffolding: React.FC<Props> = (props) => {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1,}}>
            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} />
                <Appbar.Content title={props.title} />
            </Appbar.Header>
            <View style={{flex: 1, flexGrow: 1,}}>
                {props.children}
            </View>
        </View>
    );
}


export default Scaffolding;