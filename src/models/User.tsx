import { DocumentSnapshot } from "../utils/TypeAliases";
import Committee from "./Committee";

export default class User {
    constructor(
        public id: string,
        public name: string,
        public memberNumber: string,
        public committees?: Committee[],
    ) {
    }

    static fromSnapshot(snapshot: DocumentSnapshot): User {
        return new User(
            snapshot.id,
            snapshot.get('name'),
            snapshot.get('memberNumber'),
            [] // TODO
        )
    }
}