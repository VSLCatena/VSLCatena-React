import { DocumentSnapshot, QuerySnapshot } from "../../utils/TypeAliases"
import GetUser from "../../user/usecase/GetUser"
import Activity from "../model/Activity"
import DateMapper from "../../utils/mappers/DateMapper"
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export async function mapActivity(snapshot: DocumentSnapshot): Promise<Activity> {
    let user = GetUser(snapshot.get('user'));
    let userLastEdited = GetUser(snapshot.get('userLastEdited'));

    return new Activity(
        snapshot.get('title'),
        snapshot.get('content'),
        (await user)!!,
        DateMapper(snapshot.get('date') as FirebaseFirestoreTypes .Timestamp)!!,
        snapshot.id,
        await userLastEdited,
        DateMapper(snapshot.get('dateLastEdited') as FirebaseFirestoreTypes.Timestamp),
    )
}

export default async function mapActivities(snapshot: QuerySnapshot): Promise<Activity[]> {
    return Promise.all(snapshot.docs.map(item => mapActivity(item)));
}