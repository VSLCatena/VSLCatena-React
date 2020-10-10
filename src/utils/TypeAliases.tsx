import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type DocumentSnapshot = FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
export type QuerySnapshot = FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;