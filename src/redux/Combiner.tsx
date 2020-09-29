import { combineReducers } from "redux";
import { darkModeReducer } from "./darkmode/Reducers";
import { userReducer } from "./user/Reducers";

export const rootReducer = combineReducers({
    darkMode: darkModeReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;