import * as React from 'react';

import { useEffect, useState } from "react";
import storage from '@react-native-firebase/storage';
import { Image } from 'react-native-elements';
import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

export interface Props {
    path: string,
    placeholder?: ImageSourcePropType,
    style: StyleProp<ImageStyle>,
}

const placeholder = require('../assets/images/logo.png');

const FirebaseImage: React.FC<Props> = (props) => {
    var [image,setImage] = useState<string|null>(null);

    useEffect(() => {
        storage()
            .ref(props.path)
            .getDownloadURL()
            .then((url) => {
                setImage(url);
            }).catch((e) => {
                console.log("Couldn't load the following storage path: " + props.path);
            });
    });

    var imageSource: Object|null = null;
    if (image != null) {
        imageSource = {
            uri: image,
            method: 'GET',
        };
    }

    // We switch between 3 sources, if the image can be loaded we load that, otherwise we
    // load a placeholder, otherwise we load an empty object
    return (<Image source={imageSource ?? props?.placeholder ?? placeholder} style={props.style} />);
};

export default FirebaseImage;