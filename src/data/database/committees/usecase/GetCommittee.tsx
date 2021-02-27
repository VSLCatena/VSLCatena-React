import CommitteeCache from "../cache/CommitteeCache";
import Committee from "../model/Committee";

export default async function GetCommittee(committeeId: string): Promise<Committee|undefined> {
    return CommitteeCache.get(committeeId);
}