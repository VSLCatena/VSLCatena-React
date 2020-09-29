import { UserState } from "./Types";
import { UpdateUserAction, UPDATE_USER } from './Actions';

const initialState: UserState = {
    currentUser: null,
}

export function userReducer(
    state: UserState = initialState,
    action: UpdateUserAction,
): UserState {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                currentUser: action.user,
            }
        default:
            return state;
    }
}