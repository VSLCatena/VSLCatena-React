import Settings from "../../Settings";
import Promo from "../model/Promo";
import repository from "../repository/PromoRepository";

export default async function GetPromos(
    lastPromo: Promo|undefined, 
    limit: number = Settings.DEFAULT_LIMIT
): Promise<Promo[]> {
    return repository.getPromos(lastPromo, limit);
}