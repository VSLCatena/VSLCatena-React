import Promo from "../model/Promo";
import repository from "./PromoRepositoryImpl";

export interface PromoRepository {
    getPromos(lastPromo: Promo|undefined, limit: number): Promise<Promo[]>

    addPromo(promo: Promo): Promise<void>
}

export default repository;