import React from 'react';
import { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { BACKGROUND_BODY_COLOR, BACKGROUND_COLOR, THEME_COLOR } from '../../constants/colors';
import Navigation from '../../lib/services/Navigation';
import { actionCreators } from '../../redux/actions/user';
import { validateEmail } from '../../utils/generalFunctions';

const Owner = ({ signup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const onSuccess = () => {
        setLoading(false);
    }
    const onFailure = () => {
        setLoading(false);
    }

    const signupUser = () => {

        if (!email.trim().length) {
            Alert.alert('Warning', 'Please provide your email');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Warning', 'Please enter your valid Email.');
            return;
        }

        if (!name.trim().length || name.trim().length < 3) {
            Alert.alert('Warning', 'Please provide your name');
            return;
        }
        if (!password.length) {
            Alert.alert('Warning', 'Please provide your password');
            return
        }
        if (!confirmPassword.length) {
            Alert.alert('Warning', 'Please confirm your password');
            return
        }
        if (password !== confirmPassword) {
            Alert.alert('Warning', 'Passwords do not match.');
            return
        }
        setLoading(true);
        signup({
            email: email.toLowerCase(),
            password,
            name,
            type: "Owner",
            success: onSuccess,
            failure: onFailure
        });

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                >
                    <Image style={styles.logo} />
                    <Text style={styles.title}>
                        Restaurant Owner
                    </Text>
                    <Text style={styles.description}>
                        Step 2
                    </Text>

                    <Input placeholder={'Name'} style={styles.formView} value={name} onChange={(value) => setName(value)} keyboard={'email-address'} />
                    <Input placeholder={'Email'} style={styles.formView} value={email} onChange={(value) => setEmail(value)} keyboard={'email-address'} />
                    <Input placeholder={'Password'} style={styles.formView} value={password} secureTextEntry={true} onChange={(value) => setPassword(value)} keyboard={'visible-password'} />
                    <Input placeholder={'Confirm Password'} style={styles.formView} value={confirmPassword} secureTextEntry={true} onChange={(value) => setConfirmPassword(value)} keyboard={'visible-password'} />

                    <Button disabled={loading} title={'Register'} style={{ marginTop: 20 }} onPress={signupUser} />
                    <Button disabled={loading} title={'Back'} style={{ marginTop: 20, marginBottom: 20 }} onPress={() => { Navigation.back() }} />

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: BACKGROUND_BODY_COLOR,
        flex: 1
    },
    label: { fontSize: 14, color: '#707070' },

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
    signup: (user) => dispatch(actionCreators.signup(user)),
    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Owner);
