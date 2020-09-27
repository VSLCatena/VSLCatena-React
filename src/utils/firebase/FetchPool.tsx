import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import ItemFetcher from "./ItemFetcher";
import { DocumentSnapshot } from "../TypeAliases";


export default abstract class FetchPool<T> {
    private pool: Map<string, ItemFetcher<T>> = new Map();
    constructor() {}

    fetch(key: string): Promise<T> {
        if (this.pool.has(key)) {
            return this.pool.get(key)!!.fetch();
        }
        
        var item = new PoolFetcher(key, this.convert);
        return item.fetch();
    }

    abstract convert(snapshot: DocumentSnapshot): T;

}


class PoolFetcher<T> extends ItemFetcher<T> {
    constructor(
        path: string,
        public converter: (snapshot: DocumentSnapshot) => T
    ) {
        super(path);
    }

    convert(snapshot: DocumentSnapshot): T {
        return this.converter(snapshot);
    }
}