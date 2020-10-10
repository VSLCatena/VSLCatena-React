import { DataState } from "./Types";
import AsyncStorage from "@react-native-community/async-storage";
import { Store } from 'redux';
import { DataActionTypes, setCommittees, setTopics, setTopicSettings, SET_COMMITTEES, SET_TOPICS, SET_TOPIC_SETTINGS, UPDATE_TOPIC_SETTING, } from './Actions';
import firestore from '@react-native-firebase/firestore';
import { DocumentSnapshot, QuerySnapshot } from "../../utils/TypeAliases";
import Topic from "../../models/Topic";
import Committee from "../../models/Committee";
import messaging from '@react-native-firebase/messaging';

const STORAGE_TOPIC_SETTINGS = "STORAGE_TOPIC_SETTINGS";

const initialState: DataState = {
    topics: Array(),
    topicSettings: {},
    committees: Array(),
}


export function dataReducer(
    state: DataState = initialState,
    action: DataActionTypes,
): DataState {
    
    switch (action.type) {
        case SET_TOPICS:
            return {
                ...state,
                topics: action.topics,
            }
            break;
        case SET_COMMITTEES:
            return {
                ...state,
                committees: action.committees,
            }
            break;
        case UPDATE_TOPIC_SETTING:
            var settings = state.topicSettings;
            settings[action.topicId] = action.setting;
            // Save to storage
            AsyncStorage.setItem(STORAGE_TOPIC_SETTINGS, JSON.stringify(settings));

            // (un)subscribe to firebase messaging
            if (action.setting) {
                messaging().subscribeToTopic(action.topicId);
            } else {
                messaging().unsubscribeFromTopic(action.topicId);
            }

            return {
                ...state,
                topicSettings: settings,
            }
            break;
        case SET_TOPIC_SETTINGS:
            return {
                ...state,
                topicSettings: action.settings,
            }
            break;
    }

    return state;
}

export function setupDataStore(store: Store) {
    // Topics 
    firestore().collection('topics')
        .onSnapshot((snapshot: QuerySnapshot) => {
            if (snapshot == null) return;
            const topics = snapshot.docs.map((doc) => Topic.fromSnapshot(doc));
            store.dispatch(setTopics(topics));
        });
    
    // Committees
    firestore().collection('committees')
        .onSnapshot((snapshot: QuerySnapshot) => {
            if (snapshot == null) return;
            const committees = snapshot.docs.map((doc) => Committee.fromSnapshot(doc));
            store.dispatch(setCommittees(committees));
        });

    // Topic Settings
    AsyncStorage.getItem(STORAGE_TOPIC_SETTINGS).then((value) => {
        if (value == null) return;
        store.dispatch(setTopicSettings(JSON.parse(value)));
    });
}