import User from "../model/User";
import repository from "./UserRepositoryImpl";

export interface UserRepository {
    getUser(userId: string): Promise<User|undefined>
}

export default repository;