import * as React from 'react';
import { ListRenderItemInfo } from "react-native";
import PagedList from "../../components/PagedList";
import News from '../../../data/database/news/model/News';
import NewsComponent from './NewsComponent';
import GetNews from '../../../data/database/news/usecase/GetNews';

export default class NewsPagedList extends PagedList<News> {
    
    renderItem(item: ListRenderItemInfo<News>) {
        return <NewsComponent {...item.item} />
    }

    getData(lastItem: News|null, limit: number): Promise<News[]> {
        return GetNews(lastItem, limit);
    }
}