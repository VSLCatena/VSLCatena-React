import TopicCache from "../cache/TopicCache";
import Topic from "../model/Topic";

export default async function GetTopic(): Promise<Topic[]> {
    return TopicCache.getAll();
}