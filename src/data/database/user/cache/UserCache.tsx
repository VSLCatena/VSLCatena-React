import User from "../model/User";
import userRepository from "../repository/UserRepository";

const USER_TIMEOUT = 5 * 60 * 1000;

class UserCache {
    private memo: Map<string, Holder>;

    constructor() {
        this.memo = new Map();
    }

    get(userId: string): Promise<User|undefined> {
        var cached = this.memo.get(userId);
        
        if (cached == undefined) {
            cached = new Holder(userId);
            this.memo.set(userId, cached);
        } 


        return cached.getUser();
    }
}

class Holder {
    private time: number = 0;
    private user: Promise<User|undefined>

    constructor(private userId: string) {
        this.user = this.getUser()
    }

    private shouldRefetch(): Boolean {
        return this.time + USER_TIMEOUT < Date.now()
    }

    async getUser(): Promise<User|undefined> {
        if (!this.shouldRefetch()) {
            return await this.user;
        }

        this.time = Date.now();
        this.user = userRepository.getUser(this.userId);
        return await this.user;
    }
}

export const userCache = new UserCache();