import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { DocumentSnapshot } from "../TypeAliases";

export default abstract class ItemFetcher<T> {
    private item: T|Object = Object;
    private itemPromise: Promise<T>|null = null;


    constructor(private path: string) {
    }

    public fetch(): Promise<T> {
        if (this.itemPromise != null) { return this.itemPromise; }
        this.itemPromise = this._fetch();
        return this.itemPromise;
    }

    
    private async _fetch(): Promise<T> {
        const data = await firestore().doc(this.path).get();
        
        return this.convert(data);
    }


    abstract convert(snapshot: DocumentSnapshot): T;
}