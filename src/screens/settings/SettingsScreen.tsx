import * as React from 'react';
const useState = React.useState;
import Scaffolding from '../../components/Scaffolding';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import Lang from '../../utils/Lang';
import { List, Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Combiner';
import { toggleDarkMode } from '../../redux/darkmode/Actions';

export default function SettingsScreen({navigation, route}: StackScreenProps<NavigationParams, 'Login'>) {
    const darkMode = useSelector((state: RootState) => state.darkMode);
    const dispatcher = useDispatch();

    return (
        <Scaffolding title={Lang.get('title_settings')}>
            <List.Section>
                <List.Item 
                    title="Dark Theme"
                    right={ _ => <Switch value={darkMode.useDarkMode} onValueChange={() => dispatcher(toggleDarkMode())} />}
                    onPress={() => dispatcher(toggleDarkMode())}
                    />
            </List.Section>
        </Scaffolding>
    )
};