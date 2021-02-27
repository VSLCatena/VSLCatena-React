import Committee from "../../data/database/committees/model/Committee";
import Topic from "../../data/database/topic/model/Topic";

export const SET_TOPICS = "SET_TOPICS";
export const UPDATE_TOPIC_SETTING = "UPDATE_TOPIC_SETTING";
export const SET_TOPIC_SETTINGS = "SET_TOPIC_SETTINGS";
export const SET_COMMITTEES = "SET_COMMITTEES";

interface SetTopicsAction {
    type: typeof SET_TOPICS,
    topics: Array<Topic>,
}

interface SetCommitteesAction {
    type: typeof SET_COMMITTEES,
    committees: Array<Committee>,
}

interface UpdateTopicSettingAction {
    type: typeof UPDATE_TOPIC_SETTING;
    topicId: string,
    setting: boolean,
}

interface SetTopicSettingsAction {
    type: typeof SET_TOPIC_SETTINGS,
    settings: { [key: string]: boolean },
}

export function setTopics(topics: Array<Topic>): SetTopicsAction {
    return {
        type: SET_TOPICS,
        topics: topics,
    }
}

export function updateTopic(topic: Topic, setting: boolean): UpdateTopicSettingAction {
    return {
        type: UPDATE_TOPIC_SETTING,
        topicId: topic.id,
        setting: setting,
    }
}

export function setCommittees(committees: Array<Committee>): SetCommitteesAction {
    return {
        type: SET_COMMITTEES,
        committees: committees,
    }
}

export function setTopicSettings(settings: { [key: string]: boolean }): SetTopicSettingsAction {
    return {
        type: SET_TOPIC_SETTINGS,
        settings: settings,
    }
}

export type DataActionTypes = SetTopicsAction | SetCommitteesAction | SetTopicSettingsAction | UpdateTopicSettingAction;