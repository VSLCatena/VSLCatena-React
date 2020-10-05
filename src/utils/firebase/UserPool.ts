import User from "../../models/User";
import FetchPool from "./FetchPool";
import { DocumentSnapshot } from "../TypeAliases";

class UserPoolFetcher extends FetchPool<User> {
    private static instance: UserPoolFetcher;

    static getInstance(): UserPoolFetcher {
        if (!this.instance) {
            this.instance = new UserPoolFetcher();
        }

        return this.instance;
    }

    convert(snapshot: DocumentSnapshot): User {
        return User.fromSnapshot(snapshot);
    }

    fetchUser(userId?: any): Promise<User>|null {
        if (userId == null) return null;

        return this.fetch('users/'+userId);
    }
}

export default UserPoolFetcher.getInstance();