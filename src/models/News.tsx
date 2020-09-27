import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { DocumentSnapshot } from "../utils/TypeAliases";
import UserPool from '../utils/firebase/UserPool'
import User from "./User";

export default class News {
    constructor(
        public title: string,
        public content: string,
        public date: FirebaseFirestoreTypes.Timestamp,
        public user: Promise<User>
    ) {
    }

    static fromSnapshot(snapshot: DocumentSnapshot) {
        return new News(
            snapshot.get('title'),
            snapshot.get('content'),
            snapshot.get('date'),
            UserPool.fetch('users/'+snapshot.get('user')),
        )
    }
}