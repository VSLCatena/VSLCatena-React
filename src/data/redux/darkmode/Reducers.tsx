import { DarkModeState } from "./Types";
import { DarkModeActionTypes, setDarkMode, SET_DARK_MODE, TOGGLE_DARK_MODE } from './Actions';
import AsyncStorage from "@react-native-community/async-storage";
import { Store } from 'redux';

const initialState: DarkModeState = {
    useDarkMode: true,
}

export const DARK_MODE_STORAGE_KEY = "DARK_THEME_STORAGE_KEY";

export function darkModeReducer(
    state: DarkModeState = initialState,
    action: DarkModeActionTypes,
): DarkModeState {
    var newDarkMode = state.useDarkMode;
    
    switch (action.type) {
        case SET_DARK_MODE:
            newDarkMode = action.useDarkMode;
            break;
        case TOGGLE_DARK_MODE:
            newDarkMode = !state.useDarkMode;
            break;
    }
    
    AsyncStorage.setItem(DARK_MODE_STORAGE_KEY, newDarkMode ? 'true' : 'false');

    return {
        ...state,
        useDarkMode: newDarkMode,
    };
}

export function setupDarkModeStore(store: Store) {
    // Dark theme
    AsyncStorage.getItem(DARK_MODE_STORAGE_KEY).then((isDarkTheme) => {
        if (isDarkTheme == null) return;
        store.dispatch(setDarkMode(isDarkTheme === 'true'));
    });
}