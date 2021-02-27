import Promo from "../model/Promo";
import PromoMapper from "../mapper/PromoMapper";
import { PromoRepository } from "./PromoRepository";
import firestore from "@react-native-firebase/firestore";

class PromoRepositoryImpl implements PromoRepository {
    async getPromos(lastPromo: Promo|undefined, limit: number): Promise<Promo[]> {
        var query = firestore().collection("promo")
            .orderBy('date', 'desc')
            .limit(limit);

        if (lastPromo != undefined) {
            query = query.startAfter(firestore.Timestamp.fromDate(lastPromo.date));
        }

        return PromoMapper(await query.get());
    }

    async addPromo(promo: Promo): Promise<void> {
        firestore().collection('promo').add({
            title: promo.title,
            content: promo.content,
            user: promo.user.id,
            date: firestore.Timestamp.fromDate(promo.date),
        })
    }
}

const repository = new PromoRepositoryImpl();
export default repository;