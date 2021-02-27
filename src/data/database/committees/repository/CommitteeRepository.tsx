import Committee from "../model/Committee";
import repository from "./CommitteeRepositoryImpl";

export interface CommitteeRepository {
    getCommittees(): Promise<Committee[]>
}

export default repository;