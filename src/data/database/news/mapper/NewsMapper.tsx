import { DocumentSnapshot, QuerySnapshot } from "../../utils/TypeAliases"
import News from "../model/News"
import GetUser from "../../user/usecase/GetUser"
import DateMapper from "../../utils/mappers/DateMapper"
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import User from "../../user/model/User"

export async function mapSingleNews(snapshot: DocumentSnapshot): Promise<News> {
    let user = GetUser(snapshot.get('user'));
    let userLastEdited = GetUser(snapshot.get('userLastEdited'));

    return new News(
        snapshot.get('title'),
        snapshot.get('content'),
        (await user) ?? User.Anonymous,
        DateMapper(snapshot.get('date') as FirebaseFirestoreTypes.Timestamp)!!,
        snapshot.id,
        await userLastEdited,
        DateMapper(snapshot.get('dateLastEdited') as FirebaseFirestoreTypes.Timestamp),
    )
}

export default async function mapNews(snapshot: QuerySnapshot): Promise<News[]> {
    return Promise.all(snapshot.docs.map(item => mapSingleNews(item)));
}