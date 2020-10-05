import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { DocumentSnapshot } from "../utils/TypeAliases";

export default class Activity {
    constructor(
        public title: string,
        public content: string,
        public date: FirebaseFirestoreTypes.Timestamp,
    ) {
    }

    static fromSnapshot(snapshot: DocumentSnapshot) {
        return new Activity(
            snapshot.get('title'),
            snapshot.get('content'),
            snapshot.get('date'),
        )
    }
}