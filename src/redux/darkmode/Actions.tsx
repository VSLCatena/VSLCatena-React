export const SET_DARK_MODE = "SWITCH_DARK_MODE";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

interface SetDarkModeAction {
    type: typeof SET_DARK_MODE,
    useDarkMode: boolean,
}

interface ToggleDarkModeAction {
    type: typeof TOGGLE_DARK_MODE,
}

export function setDarkMode(useDark: boolean): SetDarkModeAction {
    return {
        type: SET_DARK_MODE,
        useDarkMode: useDark
    }
}

export function toggleDarkMode(): ToggleDarkModeAction {
    return {
        type: TOGGLE_DARK_MODE,
    }
}

export type DarkModeActionTypes = SetDarkModeAction | ToggleDarkModeAction;