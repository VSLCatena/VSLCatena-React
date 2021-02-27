import { UserState } from "./Types";
import { updateUser, UpdateUserAction, UPDATE_USER } from './Actions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Store } from "redux";
import { DocumentSnapshot } from "../../data/database/utils/TypeAliases";
import mapUser from "../../data/database/user/mapper/UserMapper";
import Role from "../../data/database/user/model/Role";

const initialState: UserState = {
    currentUser: undefined,
    userRole: Role.USER,
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
                userRole: action.user?.role ?? Role.USER,
            }
        default:
            return state;
    }
}

export function setupUserStore(store: Store) {
    var unsubscriber: (() => void) | null = null;

    // Update user
    auth().onUserChanged((user) => {
        if (unsubscriber != null)
            unsubscriber();

        if (user == null) {
            store.dispatch(updateUser(undefined))
            return;
        }

        unsubscriber = firestore().doc('users/'+(user.uid))
            .onSnapshot(async (snapshot: DocumentSnapshot) => {
                store.dispatch(updateUser(await mapUser(snapshot)));
            }); 
    });
}