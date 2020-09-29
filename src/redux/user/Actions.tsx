import User from "../../models/User";

export const UPDATE_USER = "UPDATE_USER";

export interface UpdateUserAction {
    type: typeof UPDATE_USER;
    user: User | null;
}

export function updateUser(user: User | null): UpdateUserAction {
    return {
        type: UPDATE_USER,
        user: user,
    }
}