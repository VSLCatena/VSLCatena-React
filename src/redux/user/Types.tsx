import Role from "../../data/database/user/model/Role";
import User from "../../data/database/user/model/User";

export interface UserState {
    currentUser: User | undefined,
    userRole: Role,
}