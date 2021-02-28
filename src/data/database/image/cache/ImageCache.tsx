import repository from "../repository/ImageRepository";

const IMAGE_CACHE = 5 * 60 * 1000;

class ImageCache {
    private memo: Map<string, Holder>;

    constructor() {
        this.memo = new Map();
    }

    getImageDownloadUrl(reference: string): Promise<string|undefined> {
        if (!reference) return Promise.resolve(undefined);

        var cached = this.memo.get(reference);
        
        if (cached == undefined) {
            cached = new Holder(reference);
            this.memo.set(reference, cached);
        } 


        return cached.getImage();
    }
}

class Holder {
    private time: number = 0;
    private url: Promise<string|undefined>

    constructor(private reference: string) {
        this.url = this.getImage()
    }

    private shouldRefetch(): Boolean {
        return this.time + IMAGE_CACHE < Date.now()
    }

    async getImage(): Promise<string|undefined> {
        if (!this.shouldRefetch()) {
            return await this.url;
        }

        this.time = Date.now();
        this.url = repository.getImageDownloadUrl(this.reference);
        return await this.url;
    }
}

export const imageCache = new ImageCache();