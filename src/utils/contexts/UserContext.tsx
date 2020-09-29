import * as React from 'react';
import User from "../../models/User";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { DocumentSnapshot } from '../TypeAliases';

export interface UserState {
    currentUser: User | null;
};

export const UserContext = React.createContext({
    currentUser: null as User|null,
});


export class UserProvider extends React.Component<{}, UserState> {
    private unsubscriber: () => void = () => {};
    constructor(props: {}) {
        super(props);
  
        this.state = {
            currentUser: null,
        };

        
        this.unsubscriber = auth().onUserChanged((user) => {
            console.debug("New user found!");
            if (user == null) {
                this.setState(null);
                return;
            }

            firestore().doc("users/"+(user.uid)).get()
                .then((snapshot: DocumentSnapshot) => {
                    this.setState({
                        currentUser: User.fromSnapshot(snapshot)
                    });
                });
        });
    }
    
    componentWillUnmount() {
        this.unsubscriber();
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {(this.props?.children)}
            </UserContext.Provider>
        )
    }
}