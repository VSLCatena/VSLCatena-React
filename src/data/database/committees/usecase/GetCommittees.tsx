import CommitteeCache from "../cache/CommitteeCache";
import Committee from "../model/Committee";

export default async function GetCommittees(): Promise<Committee[]> {
    return CommitteeCache.getAll();
}