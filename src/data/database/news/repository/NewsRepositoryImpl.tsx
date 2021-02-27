import News from "../model/News";
import { NewsRepository } from "./NewsRepository";
import firestore from "@react-native-firebase/firestore";
import NewsMapper from "../mapper/NewsMapper";

class NewsRepositoryImpl implements NewsRepository {
    async getNews(lastNews: News|undefined, limit: number): Promise<News[]> {
        var query = firestore().collection("news")
            .orderBy('date', 'desc')
            .limit(limit);

        if (lastNews != undefined) {
            query = query.startAfter(firestore.Timestamp.fromDate(lastNews.date));
        }

        return NewsMapper(await query.get());
    }

    async addNews(news: News) {
        firestore().collection('news').add({
            title: news.title,
            content: news.content,
            user: news.user.id,
            date: firestore.Timestamp.fromDate(news.date),
        });
    }
}

const repository = new NewsRepositoryImpl();
export default repository;