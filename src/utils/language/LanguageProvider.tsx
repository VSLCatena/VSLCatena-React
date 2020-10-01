import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import LocaleContext, { LocaleState } from './LanguageContext';
import { SupportedLangs, translations, Translations } from './LanguageDefinition';

const LANG_STORAGE_KEY = "LANG_STORAGE_KEY";

export default class LanguageProvider extends React.Component<{}, LocaleState> {

    constructor(props: any) {
        super(props);
        this.state = {
            t: this.translate.bind(this),
            lang: 'nl',
            setLang: this.setLang.bind(this),
        }
    }

    private translate(key: Translations, ...args: string[]): string {
        return translations[key][this.state.lang];
    }
    
    private setLang(lang: SupportedLangs) {
        this.setState({
            lang: lang,
        });
        AsyncStorage.setItem(LANG_STORAGE_KEY, lang);
    }
    
    componentDidMount() {
        AsyncStorage.getItem(LANG_STORAGE_KEY).then((lang) => {
            if (lang == null) return;
            this.setState({
                lang: lang == 'nl' ? 'nl' : 'en',
            })
        });
    }

    render() {
        return (
            <LocaleContext.Provider value={this.state}>
                {this.props.children}
            </LocaleContext.Provider>
        );
    }
}