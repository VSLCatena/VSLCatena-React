import { DocumentSnapshot, QuerySnapshot } from "../../utils/TypeAliases"
import Promo from "../model/Promo"
import GetUser from "../../user/usecase/GetUser"
import DateMapper from "../../utils/mappers/DateMapper"
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import User from "../../user/model/User"

export async function mapSinglePromo(snapshot: DocumentSnapshot): Promise<Promo> {
    let user = GetUser(snapshot.get('user'));
    let userLastEdited = GetUser(snapshot.get('userLastEdited'));

    return new Promo(
        snapshot.get('title'),
        snapshot.get('content'),
        (await user) ?? User.Anonymous,
        DateMapper(snapshot.get('date') as FirebaseFirestoreTypes.Timestamp)!!,
        snapshot.id,
        await userLastEdited,
        DateMapper(snapshot.get('dateLastEdited') as FirebaseFirestoreTypes.Timestamp),
    )
}

export default async function mapPromo(snapshot: QuerySnapshot): Promise<Promo[]> {
    return Promise.all(snapshot.docs.map(item => mapSinglePromo(item)));
}