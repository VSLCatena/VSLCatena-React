import User from "../../data/database/user/model/User";

export const UPDATE_USER = "UPDATE_USER";

export interface UpdateUserAction {
    type: typeof UPDATE_USER;
    user: User | undefined;
}

export function updateUser(user: User | undefined): UpdateUserAction {
    return {
        type: UPDATE_USER,
        user: user,
    }
}