import { UserRepository } from "./UserRepository";
import firestore from "@react-native-firebase/firestore";
import userMapper from "../mapper/UserMapper";
import User from "../model/User";

class UserRepositoryImpl implements UserRepository {

    async getUser(userId: string): Promise<User|undefined> {
        let doc = await firestore().collection("users").doc(userId).get();
        return userMapper(doc);
    }
}
const repository = new UserRepositoryImpl();
export default repository;