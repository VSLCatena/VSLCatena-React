import * as React from 'react';
import Scaffolding from '../../components/Scaffolding';
import { StackScreenProps } from '@react-navigation/stack';
import NavigationParams from '../../NavigationParams';
import { StyleSheet, View } from 'react-native';
import LocaleContext from '../../utils/language/LanguageContext';
import { Button, TextInput } from 'react-native-paper';
import User from '../../models/User';
import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Combiner';

function postPromo(user: User, title: string, content: string) {
    firestore().collection('promo').add({
        title: title,
        content: content,
        user: user.id,
        date: firestore.Timestamp.now(),
    })
}


export default function EditPromoScreen({navigation}: StackScreenProps<NavigationParams, 'EditPromo'>) {
    const {t} = React.useContext(LocaleContext);
    const user = useSelector((state: RootState) => state.user).currentUser;

    if (user == null) {
        navigation.pop();
        return;
    }

    const [ title, setTitle ] = React.useState('');
    const [ content, setContent ] = React.useState('');

    return (
        <Scaffolding title={t('title_promo')}>
            <View style={{ padding: 16 }}>
                <TextInput
                    label="Title"
                    value={title}
                    style={styles.input}
                    onChangeText={text => setTitle(text) } />
                <TextInput
                    label="Content"
                    value={content}
                    style={styles.input}
                    multiline={true}
                    onChangeText={text => setContent(text) } />
                <View style={{flexDirection: 'row'}}>
                    <Button
                        mode='contained' 
                        style={styles.submitButton} 
                        onPress={() => { 
                            postPromo(user, title, content);
                            navigation.goBack();
                        }}>Post</Button>
                </View>
            </View>
        </Scaffolding>
    );
};

const styles = StyleSheet.create({
    input: {
        margin: 8,
    },
    submitButton: {
        margin: 8,
        marginTop: 24,
    }
})