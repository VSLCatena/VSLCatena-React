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
        await snapComms.map(async function(committeeString) {
            if (typeof committeeString !== 'string') return;

            let committee = await committeeCache.get(committeeString);
            if (committee == undefined) return;
            
            committees.push(committee);
        });
    }

    return new User(
        snapshot.id,
        snapshot.get('name'),
        snapshot.get('memberNumber'),
        roleMapper(snapshot.get('role')),
        committees
    );
}