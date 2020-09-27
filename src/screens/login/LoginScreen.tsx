import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
const useState = React.useState;
import { Alert, Button, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LabeledTextInput from '../../components/LabeledTextInput'
import NavigationParams from '../../NavigationParams';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({navigation}: StackScreenProps<NavigationParams, 'Login'>) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.image} />
            
                <LabeledTextInput
                    style={styles.inputs}
                    label="Username"
                    placeholder="Type username here"
                    onChangeText={text => setUsername(text)}
                    defaultValue={username}
                    />
                <LabeledTextInput
                    style={styles.inputs}
                    label="Password"
                    placeholder="Type password here"
                    onChangeText={text => setPassword(text)}
                    defaultValue={password} 
                    secureTextEntry={true}
                    />
                <View style={styles.buttonHolder}>
                    <Button 
                        title="Login"
                        onPress={() => { login(navigation, username, password)}} 
                        />
                </View>
            </View>
        </ScrollView>
    );
};

function login(
    navigation: StackNavigationProp<NavigationParams, 'Login'>, 
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
        .then(response => {
            navigation.replace('Home');
        })
        .catch((reason) => {
            Alert.alert('Something went wrong: ' + reason);
            console.error(reason);
        })
}

const styles = StyleSheet.create({
    buttonHolder: {
        marginTop: 10,
    },
    inputs: {
        width: "90%",
        borderColor: "rgba(0,0,0,0.6)",
        borderRadius: 4,
        borderWidth: 2,
        marginTop: 10,

    },
    image: {
        marginBottom: 48
    }
});