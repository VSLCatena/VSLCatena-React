import Topic from "../model/Topic";
import repository from "../repository/TopicRepository";

const TOPIC_TIMEOUT = 5 * 60 * 1000

class TopicCache {
    private memo: Promise<Map<string, Topic>>;
    private lastUpdated: number = Date.now();

    constructor() {
        this.memo = this.getInternal();
    }

    async get(topicId: string): Promise<Topic|undefined> {
        this.getAll();
        return (await this.memo).get(topicId);
    }

    async getAll(): Promise<Topic[]> {
        if (this.lastUpdated + TOPIC_TIMEOUT < Date.now()) {
            this.memo = this.getInternal();
            this.lastUpdated = Date.now();
        }
        return Array.from((await this.memo).values());
    }

    private async getInternal(): Promise<Map<string, Topic>> {
        return new Map((await repository.getTopics()).map(item => [item.id, item]));
    }
}

const topicCache = new TopicCache();
export default topicCache;