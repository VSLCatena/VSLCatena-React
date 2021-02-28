import { imageCache } from "../cache/ImageCache";

export default async function GetImageDownloadUrl(reference: string): Promise<string|undefined> {
    return imageCache.getImageDownloadUrl(reference);
}