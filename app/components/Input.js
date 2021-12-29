import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Input = (props) => {
    return (
        <View style={[styles.container, { ...props.style }]}>
            <TextInput style={styles.textView} placeholder={props.placeholder} value={props.value} 
                textContentType={'password'}
                secureTextEntry={props.secureTextEntry}
                
                onChangeText={(value)=>props.onChange(value)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 0, 0, 0.24)',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    textView: {
        backgroundColor: 'transparent',
        padding: 0,
        fontSize: 18,
        color: 'black',

    }
})
export default Input;