import * as React from 'react';
const useState = React.useState;
import Scaffolding from '../../components/Scaffolding';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import Lang from '../../utils/Lang';
import { DarkThemeContext } from '../../utils/contexts/DarkThemeContext';
import { List, Switch } from 'react-native-paper';

export default function SettingsScreen({navigation, route}: StackScreenProps<NavigationParams, 'Login'>) {
    const darkThemeState = React.useContext(DarkThemeContext);

    return (
        <Scaffolding title={Lang.get('title_settings')}>
            <List.Section>
                <List.Item 
                    title="Dark Theme"
                    right={ _ => <Switch value={darkThemeState.isDarkTheme} onValueChange={darkThemeState.toggleDarkTheme} />}
                    onPress={darkThemeState.toggleDarkTheme}
                    />
            </List.Section>
        </Scaffolding>
    )
};