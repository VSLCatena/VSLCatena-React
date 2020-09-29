import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
const useState = React.useState;
import { Alert, Button, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationParams from '../../NavigationParams';
import auth from '@react-native-firebase/auth';
import Lang from '../../utils/Lang';
import { TextInput } from 'react-native-paper';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.image} />
            
                <TextInput
                    label={Lang.get('login_username')}
                    mode="flat"
                    placeholder={Lang.get('login_username')}
                    onChangeText={text => setUsername(text)}
                    defaultValue={username}
                    />
                <TextInput
                    label={Lang.get('login_password')}
                    mode="flat"
                    placeholder={Lang.get('login_password')}
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
        .then(response => auth().signInWithCustomToken(response['token']))
        // .then(response => {
        //     navigation.replace('Home');
        // })
        // .catch((reason) => {
        //     Alert.alert('Something went wrong: ' + reason);
        //     console.error(reason);
        // })
}

const styles = StyleSheet.create({
    buttonHolder: {
        marginTop: 10,
    },
    image: {
        marginBottom: 48
    }
});