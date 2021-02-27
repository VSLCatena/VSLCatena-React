import Committee from "../../data/database/committees/model/Committee";
import Topic from "../../data/database/topic/model/Topic";

export interface DataState {
    topics: Array<Topic>,
    topicSettings: { [key: string]: boolean },
    committees: Array<Committee>,
}