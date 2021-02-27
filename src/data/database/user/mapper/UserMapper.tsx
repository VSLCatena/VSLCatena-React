import committeeCache from "../../committees/cache/CommitteeCache";
import Committee from "../../committees/model/Committee";
import { DocumentSnapshot } from "../../utils/TypeAliases";
import User from "../model/User";
import roleMapper from "./RoleMapper";

export default async function mapUser(snapshot: DocumentSnapshot): Promise<User|undefined> {
    if (!snapshot.exists) return undefined;

    var committees: Committee[] = [];
    let snapComms = snapshot.get("committees");

    if (snapComms instanceof Array) {
        for (let i = 0; i < snapComms.length; i++) {
            let committeeString = snapComms[i];
            if (typeof committeeString !== 'string') continue;

            let committee = await committeeCache.get(committeeString);
            if (committee == undefined) return;
            
            committees.push(committee);
        }
    
    }

    committees = committees.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) });

    return new User(
        snapshot.id,
        snapshot.get('name'),
        snapshot.get('memberNumber'),
        roleMapper(snapshot.get('role')),
        committees
    );
}