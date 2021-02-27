import * as React from 'react';
import { ListRenderItemInfo } from "react-native";
import Promo from '../../../../data/database/promo/model/Promo';
import GetPromos from '../../../../data/database/promo/usecase/GetPromos';
import PagedList from '../../../components/PagedList';
import PromoComponent from './PromoComponent';

export default class PromoPagedList extends PagedList<Promo> {
    
    renderItem(item: ListRenderItemInfo<Promo>) {
        return <PromoComponent {...item.item} />
    }

    async getData(lastItem: Promo|null, limit: number): Promise<Promo[]> {
        return GetPromos(lastItem ?? undefined, limit);
    }
}
