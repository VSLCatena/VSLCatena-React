import firestore from "@react-native-firebase/firestore";
import Activity from "../model/Activity";
import { ActivityRepository } from "./ActivityRepository";
import ActivityMapper from "../mapper/ActivityMapper"

class ActivityRepositoryImpl implements ActivityRepository {
    async getActivities(lastActivity: Activity|undefined, limit: number): Promise<Activity[]> {
        var query = firestore().collection("activities")
            .orderBy('date', 'desc')
            .limit(limit);

        if (lastActivity != undefined) {
            query = query.startAfter(firestore.Timestamp.fromDate(lastActivity.date));
        }

        return ActivityMapper(await query.get());
    }
}

const repository = new ActivityRepositoryImpl();
export default repository;