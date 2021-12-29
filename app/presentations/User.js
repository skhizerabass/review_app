import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR, THEME_SECONDARY_COLOR } from '../constants/colors';

const UserItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Image style={styles.image} />
            <View style={styles.body}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.otherTxt}>{props.email}</Text>
                <Text style={styles.otherTxt}>{props.type}</Text>
            </View>
            <Icon name={'delete'} size={23} style={{ paddingLeft: 15, alignSelf: 'center' }} onPress={props.removeUser} color={THEME_SECONDARY_COLOR} />

        </TouchableOpacity >

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 17
    },
    image: {
        backgroundColor: THEME_COLOR,
        borderRadius: 5,
        height: 100,
        width: 100
    },
    otherTxt: {
        fontSize: 14,
    },
    body: {
        flex: 1,
        marginLeft: 10
    }
})
export default UserItem;
