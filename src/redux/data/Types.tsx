import Committee from "../../models/Committee";
import Topic from "../../models/Topic";

export interface DataState {
    topics: Array<Topic>,
    topicSettings: { [key: string]: boolean },
    committees: Array<Committee>,
}