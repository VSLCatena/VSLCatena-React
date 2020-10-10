import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from "react-native";
import { Card, Text } from 'react-native-paper';
import FirebaseImage from '../../components/FirebaseImage';
import PagedList, {PagedListProps} from "../../components/PagedList";
import Activity from '../../models/Activity';
import User from '../../models/User';
import { NavigationProps } from '../../NavigationParams';
import { ChunkedListProps } from '../../utils/firebase/ChunkedListFetcher';
import { DocumentSnapshot } from '../../utils/TypeAliases';

export default class ActivitiesPagedList extends PagedList<Activity> {
    
    convert(data: DocumentSnapshot): Activity {
        return Activity.fromSnapshot(data);
    }

    renderItem(item: Activity): React.ReactElement<Activity> {
        return <ActivityElement {...item} />;
    }

    getInfo(): ChunkedListProps {
        return {
            path: 'activities',
            orderedBy: 'date',
            descending: true,
        }
    }
}

const ActivityElement: React.FC<Activity> = (props) => {
    const navigation = useNavigation();
    var [user, setUser] = React.useState<User>();
    React.useEffect(() => {
        props.user.then((user) => { setUser(user); });
    });
    

    return (
        <Card style={{ marginTop: 8, marginBottom: 8, marginStart: 16, marginEnd: 16, }}>
            <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FirebaseImage path={"users/"+(user?.id ?? "")+".jpg"} style={{ width: 50, height: 50, }} />
                 <View style={{flexDirection: 'column', padding: 8 }}>
                    <Text style={{ fontSize: 16 }}>{props.title}</Text>
                    <Text onPress={() => {navigation.navigate('Profile', {user: user})}}>{user?.name}</Text>
                    <Text>{props.date.toDate().toISOString()}</Text>
                </View>
            </Card.Content>
            <Card.Content>
                <Text>{props.content}</Text>
            </Card.Content>
        </Card>
    );
};