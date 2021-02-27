import Topic from "../model/Topic";
import { TopicRepository } from "./TopicRepository";
import firestore from "@react-native-firebase/firestore";
import mapper from "../mapper/TopicMapper"

class TopicRepositoryImpl implements TopicRepository {
    async getTopics(): Promise<Topic[]> {
        let docs = await firestore().collection("topics").get();
        return mapper(docs);
    }
}
const repository = new TopicRepositoryImpl();
export default repository;