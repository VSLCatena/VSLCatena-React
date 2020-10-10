import { DocumentSnapshot } from "../utils/TypeAliases";

export default class Topic {
    constructor(
        public id: string,
        public title: string,
        public description: string,
    ) {
    }

    static fromSnapshot(snapshot: DocumentSnapshot) {
        return new Topic(
            snapshot.id,
            snapshot.get('title'),
            snapshot.get('description'),
        )
    }
}