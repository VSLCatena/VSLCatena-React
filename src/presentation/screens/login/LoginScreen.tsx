import * as React from 'react';
const useState = React.useState;
import { Button, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import LocaleContext from '../../language/LanguageContext';
import { RootState } from '../../../data/redux/Combiner';
import { useSelector } from 'react-redux';
import { NavigationAction, useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const {t} = React.useContext(LocaleContext);
    const currentUser = useSelector((state: RootState) => state.user).currentUser;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (currentUser != null) {
        useNavigation().reset({
            index: 1,
            routes: [ { name: 'Home' } ]
        })
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image
                    source={require('../../../assets/images/logo.png')}
                    style={styles.image} />
            
                <TextInput
                    label={t('login_username')}
                    mode="flat"
                    placeholder={t('login_username')}
                    onChangeText={text => setUsername(text)}
                    defaultValue={username}
                    />
                <TextInput
                    label={t('login_password')}
                    mode="flat"
                    placeholder={t('login_password')}
                    onChangeText={text => setPassword(text)}
                    defaultValue={password} 
                    secureTextEntry={true}
                    />
                <View style={styles.buttonHolder}>
                    <Button 
                        title="Login"
                        onPress={() => { login(username, password)}} 
                        />
                </View>
            </View>
        </ScrollView>
    );
};

function login(
    username: string, 
    password: string,
) {
    var data = new FormData();
    data.append('username', username);
    data.append('password', password);

    fetch('https://applogin.vslcatena.nl/login', {
        method: 'POST',
        body: data,
    })
        .then(response => {
            console.debug(response);
            return response;
        })
        .then(response => response.json())
        .then(response => auth().signInWithCustomToken(response['token']));
}

const styles = StyleSheet.create({
    buttonHolder: {
        marginTop: 10,
    },
    image: {
        marginBottom: 48
    }
});