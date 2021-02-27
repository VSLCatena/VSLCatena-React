import * as React from 'react';
import storage from '@react-native-firebase/storage';
import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import GetImageDownloadUrl from '../../data/database/image/usecase/GetImageDownloadUrl';
import PromoScreen from '../promo/PromoScreen';

export interface Props {
    reference: string,
    placeholder?: ImageSourcePropType,
    style: StyleProp<ImageStyle>,
}

const placeholder = require('../../assets/images/logo.png');

const StorageImage: React.FC<Props> = (props) => {
    var [image,setImage] = useState<string|null>(null);

    useEffect(() => {
        GetImageDownloadUrl(props.reference)
            .then((url) => {
                if (url != null)
                    setImage(url);
            }).catch((e) => {});
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

export default StorageImage;