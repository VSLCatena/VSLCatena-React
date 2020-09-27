import User from "../models/User";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { DocumentSnapshot } from "./TypeAliases";

export namespace UserProvider {
    export function observeWithEffect(
        callback: (user: User|null) => void
    ): () => (void | (() => void | undefined)) {
        return () => {
            var unsubscriber = auth().onUserChanged((user) => {
                if (user == null) {
                    callback(null);
                    return;
                }
    
                firestore().doc("users/"+(user.uid)).get()
                    .then((snapshot: DocumentSnapshot) => {
                        callback(User.fromSnapshot(snapshot));
                    });
            });
    
            return unsubscriber;
        };
    }
}