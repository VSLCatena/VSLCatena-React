import User from "../model/User";
import { userCache } from "../cache/UserCache";

export default async function GetUser(userId: string): Promise<User|undefined> {
    try {
        return await userCache.get(userId);
    } catch (e) {
        console.warn("Couldn't get user", e);
    }
}