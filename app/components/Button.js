import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { THEME_COLOR } from '../constants/colors';

const Button = (props) => {
    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={[styles.container, { ...props.style }]}>
            <Text style={styles.textView}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME_COLOR,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    textView: {
        backgroundColor: 'transparent',
        padding: 0,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',

    }
})
export default Button;