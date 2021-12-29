import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Image, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { BACKGROUND_BODY_COLOR, BACKGROUND_COLOR, THEME_COLOR } from '../../constants/colors';
import Navigation from '../../lib/services/Navigation';
import { actionCreators } from '../../redux/actions/user';
import { validateEmail } from '../../utils/generalFunctions';


const Login = ({
    login,
    user
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("USER").then(data => {
            if (data) {
                // loadUser();
                data = JSON.parse(data);
                // 
                if (data.type === 'Customer') {
                    Navigation.replace('UserHome');

                } else if (data.type === 'Owner') {
                    Navigation.replace('OwnerDashboard');

                } else if (data.type === 'Admin') {
                    Navigation.replace('AdminDashboard');
                }
            } else {

                // Navigation.replace('Login')
            }
        }, 500)
    }, [user]);

    const onLogin = () => {

        if (!email) {
            Alert.alert('Warning', 'Please enter Email.');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Warning', 'Please enter your valid Email.');
            return;
        }
        if (!password) {
            Alert.alert('Warning', 'Please enter Password.');
            return;
        }

        setLoading(false);
        Keyboard.dismiss();

        //Redux Action Call Login User
        login({
            email: email.toLowerCase(),
            password,
            success: onFetch,
            failure: onFailure,
        });
    };


    const onFetch = () => {
        // Navigation.replace('UserHome');
        setLoading(false);
    };

    const onFailure = () => {
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>
                <ScrollView
                    contentContainerStyle={styles.body}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                >
                    <Image style={styles.logo} />
                    <Text style={styles.description}>
                        Proceed with yours
                    </Text>
                    <Text style={styles.title}>
                        Login
                    </Text>

                    <Input placeholder={'Email'} style={styles.formView} value={email} onChange={(value) => setEmail(value)} keyboard={'email-address'} />
                    <Input placeholder={'Password'} style={styles.formView} value={password} secureTextEntry={true} onChange={(value) => setPassword(value)} keyboard={'visible-password'} />

                    <Button disabled={loading} title={'Login'} style={{ marginTop: 20 }} onPress={() => {
                        onLogin();
                    }} />
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={styles.label}>Don't have an account ?</Text>
                        <TouchableOpacity disabled={loading} onPress={() => { Navigation.navigate('Signup') }}>
                            <Text style={[styles.touchableTxt, { color: THEME_COLOR, marginLeft: 5, fontSize: 18 }]}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: BACKGROUND_BODY_COLOR
    },
    label: {
        fontSize: 14,
        color: '#707070'
    },
    logo: {
        marginTop: 50,
        width: 100,
        height: 100,
        alignSelf: 'center',
        backgroundColor: THEME_COLOR,
        borderRadius: 50
    },
    error: {
        color: THEME_COLOR,
        marginTop: 2,
        fontSize: 12,
    },
    formView: {
        marginTop: 30
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


const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(actionCreators.login(user)),
    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
