import Activity from "../model/Activity";
import repository from "./ActivityRepositoryImpl";

export interface ActivityRepository {
    getActivities(fromId: Activity|undefined, limit: number): Promise<Activity[]>
}

export default repository;