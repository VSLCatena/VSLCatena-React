import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import News from "../model/News";
import repository from "../repository/NewsRepository";


export default async function AddNews(news: News) {
    repository.addNews(news);
}