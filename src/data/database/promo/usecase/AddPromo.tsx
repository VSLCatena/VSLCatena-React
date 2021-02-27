import Promo from "../model/Promo";
import repository from "../repository/PromoRepository";

export default async function AddPromo(promo: Promo): Promise<void> {
    return repository.addPromo(promo);
}