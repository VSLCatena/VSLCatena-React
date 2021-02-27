import repository from "./ImageRepositoryImpl";

export interface ImageRepository {
    getImageDownloadUrl(reference: string): Promise<string|undefined>
}

export default repository;