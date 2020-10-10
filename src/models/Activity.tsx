import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import UserPool from "../utils/firebase/UserPool";
import { DocumentSnapshot } from "../utils/TypeAliases";
import User from "./User";

export default class Activity {
    constructor(
        public title: string,
        public content: string,
        public user: Promise<User>,
        public date: FirebaseFirestoreTypes.Timestamp,
        public userLastEdited: Promise<User>|null,
        public dateLastEdited: FirebaseFirestoreTypes.Timestamp|null,
    ) {
    }

    static fromSnapshot(snapshot: DocumentSnapshot) {
        return new Activity(
            snapshot.get('title'),
            snapshot.get('content'),
            UserPool.fetch('users/'+snapshot.get('user')),
            snapshot.get('date'),
            UserPool.fetchUser(snapshot.get('userLastEdited')),
            snapshot.get('dateLastEdited'),
        )
    }
}