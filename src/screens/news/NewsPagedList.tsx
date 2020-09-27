import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ListRenderItemInfo, Text, View } from "react-native";
import FirebaseImage from '../../components/FirebaseImage';
import PagedList from "../../components/PagedList";
import News from "../../models/News";
import User from '../../models/User';
import { NavigationProps } from '../../NavigationParams';
import { ChunkedListProps } from '../../utils/firebase/ChunkedListFetcher';
import { DocumentSnapshot } from '../../utils/TypeAliases';

export default class NewsPagedList extends PagedList<News> {

    constructor(props: ChunkedListProps) {
        super(props);
    }
    
    convert(data: DocumentSnapshot): News {
        return News.fromSnapshot(data);
    }

    renderItem(item: News): React.ReactElement<News> {
        return (<NewsElement {...item} />);
    }

    getInfo(): ChunkedListProps {
        return {
            path: 'news',
            orderedBy: 'date',
            descending: true,
        }
    }
}

const NewsElement: React.FC<News> = (props) => {
    const navigation = useNavigation();
    var [user, setUser] = React.useState<User>();
    React.useEffect(() => {
        props.user.then((user) => { setUser(user); });
    });

    return (
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
            <FirebaseImage path={"users/"+(user?.id ?? "")+".jpg"} style={{ width: 50, height: 50 }} />
            <Text onPress={() => {navigation.navigate('Profile', {user: user})}}>{user?.name}</Text>
            <Text>{props.title}</Text>
            <Text>{props.content}</Text>
        </View>
    );
};