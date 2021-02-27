import Committee from "../model/Committee";
import repository from "../repository/CommitteeRepository";

const COMMITTEE_TIMEOUT = 5 * 60 * 1000

class CommitteeCache {
    private memo: Promise<Map<string, Committee>>;
    private lastUpdated: number = Date.now();

    constructor() {
        this.memo = this.getInternal();
    }

    async get(committeeId: string): Promise<Committee|undefined> {
        await this.getAll();
        return (await this.memo).get(committeeId);
    }

    async getAll(): Promise<Committee[]> {
        if (this.lastUpdated + COMMITTEE_TIMEOUT < Date.now()) {
            this.memo = this.getInternal();
            this.lastUpdated = Date.now();
        }
        return Array.from((await this.memo).values());
    }

    private async getInternal(): Promise<Map<string, Committee>> {
        return new Map((await repository.getCommittees()).map(item => [item.id, item]));
    }
}

const committeeCache = new CommitteeCache();
export default committeeCache;