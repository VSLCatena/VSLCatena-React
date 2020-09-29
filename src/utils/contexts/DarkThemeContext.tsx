import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Appearance } from 'react-native-appearance';

export interface DarkThemeState {
    isDarkTheme: boolean;
    toggleDarkTheme: () => void;
}

export const DarkThemeContext = React.createContext({
    isDarkTheme: true,
    toggleDarkTheme: () => {},
});


export class DarkThemeProvider extends React.Component<{}, DarkThemeState> {
    private static DARK_THEME_STORAGE_KEY = 'DARK_THEME_STORAGE_KEY';
    private toggleDarkTheme: () => void;
  
    constructor(props: {}) {
        super(props);
  
        this.toggleDarkTheme = () => {
            this.setState(state => ({
                isDarkTheme: !state.isDarkTheme
            }), () => {
                AsyncStorage.setItem(DarkThemeProvider.DARK_THEME_STORAGE_KEY, this.state.isDarkTheme ? 'true' : 'false');
            });
        };

        this.state = {
            isDarkTheme: Appearance.getColorScheme() == 'dark',
            toggleDarkTheme: this.toggleDarkTheme
        }

        AsyncStorage.getItem(DarkThemeProvider.DARK_THEME_STORAGE_KEY).then((isDarkTheme) => {
            if (isDarkTheme == null) return;
            this.setState({ isDarkTheme: isDarkTheme === 'true', });
        });
    }

    render() {
        return (
            <DarkThemeContext.Provider value={this.state}>
                {(this.props?.children)}
            </DarkThemeContext.Provider>
        )
    }
}