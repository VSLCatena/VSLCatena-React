import { UserState } from "./Types";
import { updateUser, UpdateUserAction, UPDATE_USER } from './Actions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Store } from "redux";
import { DocumentSnapshot } from "../../utils/TypeAliases";
import User from "../../models/User";

const initialState: UserState = {
    currentUser: null,
    userRole: 0,
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
                userRole: action.user?.role ?? 0,
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
            store.dispatch(updateUser(null))
            return;
        }

        unsubscriber = firestore().doc('users/'+(user.uid))
            .onSnapshot((snapshot: DocumentSnapshot) => {
                store.dispatch(updateUser(User.fromSnapshot(snapshot)));
            }); 
    });
}