import User from "../../user/model/User";

export default class Promo {
    constructor(
        public title: string,
        public content: string,
        public user: User,
        public date: Date,
        public id: string|undefined = undefined,
        public userLastEdited: User|undefined = undefined,
        public dateLastEdited: Date|undefined = undefined,
    ) {
    }
}