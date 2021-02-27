import { ImageRepository } from "./ImageRepository";
import storage from '@react-native-firebase/storage';
class ImageRepositoryImpl implements ImageRepository {

    async getImageDownloadUrl(reference: string): Promise<string|undefined> {
        if (!reference) return undefined;
        
        return storage()
            .ref(reference)
            .getDownloadURL()
    }
}
const repository = new ImageRepositoryImpl();
export default repository;