import { DocumentSnapshot, QuerySnapshot } from "../../utils/TypeAliases"
import Committee from "../model/Committee"

export function mapCommittee(snapshot: DocumentSnapshot): Committee {
    return new Committee(
        snapshot.id,
        snapshot.get('name'),
        snapshot.get('description'),
        snapshot.get('email'),
     )
}

export default function mapCommittees(snapshot: QuerySnapshot): Committee[] {
    return snapshot.docs.map(item => mapCommittee(item));
}