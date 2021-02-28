import * as React from 'react';
import { useEffect, useState } from "react";
import { ImageSourcePropType } from 'react-native';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import GetImageDownloadUrl from '../../data/database/image/usecase/GetImageDownloadUrl';

export interface Props {
    reference?: string,
    placeholder?: ImageSourcePropType,
}

const placeholder = require('../../assets/images/logo.png');

const StorageImage: React.FC<Props & Omit<FastImageProps, 'source'>> = (props) => {
    var [source,setSource] = useState<Source>(props?.placeholder ?? placeholder);

    useEffect(() => {
        GetImageDownloadUrl(props.reference ?? "")
            .then((url) => {
                if (url != null)
                    setSource({uri: url});
            }).catch(() => {});
    });

    return (<FastImage {...props} source={source} />);
};

export default StorageImage;