import Committee from "../model/Committee";
import { CommitteeRepository } from "./CommitteeRepository";
import firestore from "@react-native-firebase/firestore";
import mapper from "../mapper/CommitteeMapper"

class CommitteeRepositoryImpl implements CommitteeRepository {
    async getCommittees(): Promise<Committee[]> {
        let docs = await firestore().collection("committees")
            .orderBy('name')
            .get();
        return mapper(docs);
    }
}

const repository = new CommitteeRepositoryImpl();
export default repository;