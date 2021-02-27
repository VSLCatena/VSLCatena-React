import * as React from 'react';
import { ListRenderItemInfo, View } from "react-native";
import PagedList from "../../components/PagedList";
import ActivityComponent from './ActivityComponent';
import GetActivities from '../../../data/database/activity/usecase/GetActivities';
import Activity from '../../../data/database/activity/model/Activity';


export default class ActivitiesPagedList extends PagedList<Activity> {
    
    renderItem(item: ListRenderItemInfo<Activity>) {
        return <ActivityComponent {...item.item} />
    }

    async getData(lastItem: Activity|null, limit: number): Promise<Activity[]> {
        return GetActivities(lastItem ?? undefined, limit);
    }
}
