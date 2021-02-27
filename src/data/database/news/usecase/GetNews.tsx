import Settings from "../../Settings";
import News from "../model/News";
import repository from "../repository/NewsRepository";

export default async function GetNews(
    lastNews: News|null, 
    limit: number = Settings.DEFAULT_LIMIT
): Promise<News[]> {
    return repository.getNews(lastNews ?? undefined, limit);
}