import { combineReducers } from "redux";
import { darkModeReducer } from "./darkmode/Reducers";
import { dataReducer } from "./data/Reducers";
import { userReducer } from "./user/Reducers";

export const rootReducer = combineReducers({
    darkMode: darkModeReducer,
    user: userReducer,
    data: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;