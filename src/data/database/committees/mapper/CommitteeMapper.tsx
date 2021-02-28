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
    let committees = snapshot.docs.map(item => mapCommittee(item));
    
    committees = committees.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) });

    return committees;
}