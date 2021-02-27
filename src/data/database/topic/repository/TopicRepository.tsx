import Topic from "../model/Topic";
import repository from "./TopicRepositoryImpl";

export interface TopicRepository {
    getTopics(): Promise<Topic[]>
}

export default repository;