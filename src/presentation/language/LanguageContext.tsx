import * as React from 'react';
import { SupportedLangs, Translations } from './LanguageDefinition';


export interface LocaleState {
    t: (key: Translations, ...args: string[]) => string,
    lang: SupportedLangs,
    setLang: (newLang: SupportedLangs) => void,
}

const LocaleContext = React.createContext<LocaleState>({ 
    t: (_, __) => "", 
    lang: 'nl', 
    setLang: (_) => {}
});

export default LocaleContext;