import { Alert } from 'react-native';
import NfcManager, {NfcEvents, TagEvent} from 'react-native-nfc-manager';

export default class NfcHandler {
    mount() {

        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: TagEvent) => {
            Alert.alert('Tag received! ' + tag.id);
            console.debug(tag);
        });
        NfcManager.registerTagEvent();
    }

    unmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
}