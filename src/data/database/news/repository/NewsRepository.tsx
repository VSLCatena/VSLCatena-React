import News from "../model/News";
import repository from "./NewsRepositoryImpl"

export interface NewsRepository {
    getNews(lastNews: News|undefined, limit: number): Promise<News[]>

    addNews(news: News): Promise<void>
}

export default repository