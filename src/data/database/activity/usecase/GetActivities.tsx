import Settings from "../../Settings";
import Activity from "../model/Activity";
import repository from "../repository/ActivityRepository";

export default async function GetActivities(
    fromId: Activity|undefined, 
    limit: number = Settings.DEFAULT_LIMIT
): Promise<Activity[]> {
    return repository.getActivities(fromId, limit);
}