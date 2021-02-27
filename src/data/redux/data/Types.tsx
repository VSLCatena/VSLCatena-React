import Committee from "../../database/committees/model/Committee";
import Topic from "../../database/topic/model/Topic";

export interface DataState {
    topics: Array<Topic>,
    topicSettings: { [key: string]: boolean },
    committees: Array<Committee>,
}