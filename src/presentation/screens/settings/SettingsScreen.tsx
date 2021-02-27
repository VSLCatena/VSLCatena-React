import * as React from 'react';
const useState = React.useState;
import Scaffolding from '../../components/Scaffolding';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../../NavigationParams';
import { Button, List, Switch, ToggleButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../data/redux/Combiner';
import { toggleDarkMode } from '../../../data/redux/darkmode/Actions';
import LocaleContext from '../../language/LanguageContext';

export default function SettingsScreen({navigation, route}: StackScreenProps<NavigationParams, 'Login'>) {
    const darkMode = useSelector((state: RootState) => state.darkMode);
    const {t, lang, setLang} = React.useContext(LocaleContext);
    const dispatcher = useDispatch();

    const langButtons = (
        <>
            <Button onPress={() => setLang('nl')} mode={lang=='nl' ? 'contained' : 'outlined'}>{t('settings_language_nl')}</Button>
            <Button onPress={() => setLang('en')} mode={lang=='en' ? 'contained' : 'outlined'}>{t('settings_language_en')}</Button>
        </>
    )

    return (
        <Scaffolding title={t('title_settings')}>
            <List.Section>
                <List.Item 
                    title={t('settings_dark_mode')}
                    right={ _ => <Switch value={darkMode.useDarkMode} onValueChange={() => dispatcher(toggleDarkMode())} />}
                    onPress={() => dispatcher(toggleDarkMode())}
                    />
                <List.Item
                    title={t('settings_language')}
                    right={ _ => langButtons}
                    />  
            </List.Section>
        </Scaffolding>
    )
};