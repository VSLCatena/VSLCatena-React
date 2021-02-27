import Role from "../../database/user/model/Role";
import User from "../../database/user/model/User";

export interface UserState {
    currentUser: User | undefined,
    userRole: Role,
}