import Committee from "../../committees/model/Committee";
import Role from "./Role";

export default class User {
    constructor(
        public id: string,
        public name: string,
        public memberNumber: string,
        public role: Role,
        public committees: Committee[],
    ) {
    }

    getImageReference(): string {
        return "users/" + this.id + "/profile.jpg";
    }

    static Anonymous = new User("???", "Anonymous", "??-???", Role.USER, []);
}