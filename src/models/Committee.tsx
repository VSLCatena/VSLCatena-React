import { DocumentSnapshot } from "../utils/TypeAliases";

export default class Committee {
    constructor(
        public id: string,
        public name: string,
    ) {
    }

    static fromSnapshot(snapshot: DocumentSnapshot) {
        return new Committee(
            snapshot.get('id'),
            snapshot.get('name'),
        )
    }
}