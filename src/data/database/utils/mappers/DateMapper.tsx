import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export default function mapDate(timestamp: FirebaseFirestoreTypes.Timestamp|undefined): Date|undefined {
    if (timestamp == null) return undefined;
    return timestamp.toDate();
}