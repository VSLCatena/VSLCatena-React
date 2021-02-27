import { DocumentSnapshot, QuerySnapshot } from "../../utils/TypeAliases"
import Topic from "../model/Topic"

export async function mapTopic(snapshot: DocumentSnapshot): Promise<Topic> {
    return new Topic(
        snapshot.id,
        snapshot.get('title'),
        snapshot.get('description'),
    )
}

export default async function mapTopics(snapshot: QuerySnapshot): Promise<Topic[]> {
    return Promise.all(snapshot.docs.map(item => mapTopic(item)));
}