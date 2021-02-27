import * as React from 'react';
import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import GetImageDownloadUrl from '../../data/database/image/usecase/GetImageDownloadUrl';

export interface Props {
    reference?: string,
    placeholder?: ImageSourcePropType,
    style: StyleProp<ImageStyle>,
}

const placeholder = require('../../assets/images/logo.png');

const StorageImage: React.FC<Props> = (props) => {
    var [image,setImage] = useState<string|null>(null);

    useEffect(() => {
        let reference = props.reference;
        if (reference == null) return;
        GetImageDownloadUrl(reference)
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