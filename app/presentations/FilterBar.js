import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { THEME_COLOR } from '../constants/colors';

const Filter = (props) => (
    <TouchableOpacity style={props.selected === props.value ? styles.selected : styles.unselected} onPress={props.onPress}>
        <Text style={props.selected === props.value ? styles.text : styles.unselectedText}>
            {props.text}
        </Text>
    </TouchableOpacity>
)
const styles = StyleSheet.create({
    unselected: {
        borderColor: THEME_COLOR,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    unselectedText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',

    },
    selected: {
        backgroundColor: THEME_COLOR,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    }
})
export default Filter;
