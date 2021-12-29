import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/Button';
import { BACKGROUND_BODY_COLOR, BACKGROUND_COLOR, THEME_COLOR } from '../../constants/colors';
import Navigation from '../../lib/services/Navigation';

const Signup = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>
                <View style={{ flex: 1 }}>
                    <Image style={styles.logo} />

                    <Text style={styles.title}>
                        Signup
                    </Text>
                    <Text style={styles.description}>
                        Step 1
                    </Text>

                    <Button title={'I am a Restaurant Owner'} style={{ marginTop: 120 }} onPress={() => Navigation.navigate("Owner")} />
                    <Button title={'I am a Customer'} style={{ marginTop: 20 }} onPress={() => Navigation.navigate("User")} />

                </View>

                <View style={styles.bottomView}>
                    <Text style={styles.label}>Have an account ?</Text>
                    <TouchableOpacity onPress={() => { Navigation.back() }}>
                        <Text style={[styles.touchableTxt, { color: THEME_COLOR, marginLeft: 5, fontSize: 18 }]}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: BACKGROUND_BODY_COLOR,
        flex: 1
    },
    bottomView: {
        margin: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
    },
    logo: {
        marginTop: 50,
        width: 100,
        height: 100,
        alignSelf: 'center',
        backgroundColor: THEME_COLOR,
        borderRadius: 50
    },
    title: {
        fontSize: 24,
        marginTop: 20,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    description: {
        marginTop: 5,
        color: '#000',
        fontSize: 18,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: BACKGROUND_COLOR
    }
})


export default Signup;
