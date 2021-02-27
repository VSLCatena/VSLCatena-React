import repository from "../repository/ImageRepository";

export default async function GetImageDownloadUrl(reference: string): Promise<string|undefined> {
    return repository.getImageDownloadUrl(reference);
}