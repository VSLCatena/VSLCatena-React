import News from "../../../../data/database/news/model/News";
import * as React from 'react';
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Text } from 'react-native-paper';
import StorageImage from "../../../components/StorageImage"

const NewsComponent: React.FC<News> = (props) => {
    const navigation = useNavigation();

    return (
        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <Card>
                <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <StorageImage reference={props.user.getImageReference()} style={{ width: 50, height: 50, }} />
                    <View style={{flexDirection: 'column', padding: 8 }}>
                        <Text style={{ fontSize: 16 }}>{props.title}</Text>
                        <Text onPress={() => {navigation.navigate('Profile', {user: props.user})}}>{props.user.name}</Text>
                        <Text>{props.date.toISOString()}</Text>
                    </View>
                </Card.Content>
                <Card.Content>
                    <Text>{props.content}</Text>
                </Card.Content>
            </Card>
        </View>
    );
};

export default NewsComponent