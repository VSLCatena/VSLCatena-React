import * as React from 'react';
import { Text, View, TextInputProps, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export interface Props extends TextInputProps {
    label: string;
    inputStyle?: StyleProp<TextStyle>
}


const LabeledTextInput: React.FC<Props> = (props) => {
    var style = StyleSheet.compose({...styles.parent}, props.style);
    var inputStyle = StyleSheet.compose({...styles.inputStyle}, props.inputStyle);
    var textInput: TextInput|null = null;

    return (
        // @ts-ignore Focus is throwing an error for unknown reasons
        <View style={style} onTouchEnd={() => textInput?.focus() }>
            <Text style={styles.text}>{props.label}</Text>
            <TextInput ref={ ref => textInput = ref } {...props} style={inputStyle} />
        </View>
    );
};

const styles = StyleSheet.create({
    parent: {
        padding: 6,
        paddingBottom: 4
    },
    text: {
        fontWeight: 'bold',
    },
    inputStyle: {
        padding: 0,
    }
})

export default LabeledTextInput;