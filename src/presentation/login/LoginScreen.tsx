import * as React from 'react';
const useState = React.useState;
import { Button, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import LocaleContext from '../../utils/language/LanguageContext';
import { RootState } from '../../redux/Combiner';
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
                    source={require('../../assets/images/logo.png')}
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
    var token = null;
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1icGxoaUB2c2wtY2F0ZW5hLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstYnBsaGlAdnNsLWNhdGVuYS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOlwvXC9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb21cL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwidWlkIjoiNTgzMzMzZDItYzRkNy00ZmE2LWI4MzgtMmJiMjdlNmI5NzVhIiwiaWF0IjoxNjE0NDM3MzUyLCJleHAiOjE2MTQ0NDA5NTJ9.pGJ1FCEQxQJdTyjjXUEyNtpD0mGZXENp0vtM2kJ7L_LnqF8dzfxV6_UMYvVzQcpQ2cvFit8fGE2WpIK6j2v4fF2gry5rEKh-ay6V_AV5jIFrZV7H6fLX4lvjMQcmfDrjGC55aAcQE4Vbpo48OSjNOc5YemwOdFH_h6g6muewDzilXnXQ2_713vfmy-_zTrOzi92l1QyOXJlnlVGa_kVWLIW13Y1DjWDkqW_K-jFGxxlveDNblksgpn3qwSRS_ugG3CJi1cPjaiCuftHVFyDtr4tqlAfBj2KM8tdYhowHoPP4CIApQ-ctp690bYb1JgZQFnH57YV5Eb9JTpUAK5AgFg";

    if (token != null) {
        auth().signInWithCustomToken(token);
        return;
    }

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