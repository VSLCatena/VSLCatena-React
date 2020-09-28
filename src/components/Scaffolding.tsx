import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, useNavigation, useTheme } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import { Header, Text, ThemeContext, ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';

export interface Props {
    title?: string,
}
const Scaffolding: React.FC<Props> = (props) => {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1,}}>
            <Header 
                leftComponent={{ 
                    icon: 'menu',
                    onPress: () => { navigation.dispatch(DrawerActions.openDrawer()) }
                }}
                centerComponent={{ text: props.title, }} 
                />
            <View style={{flexGrow: 1,}}>
                {props.children}
            </View>
        </View>
    );
}


export default Scaffolding;