import React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import { BACKGROUND_COLOR, THEME_COLOR } from 'app/constants/colors';
import Navigation from 'app/lib/services/Navigation';
import { Appbar } from 'react-native-paper';
import user from '../../../redux/reducers/user';
import { connect } from 'react-redux';
import { actionCreators } from '../../../redux/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKGROUND_BODY_COLOR } from '../../../constants/colors';

const Settings = ({ user, saveUser, logout }) => {
    const [name, setName] = useState(user.user ? user.user.name : '');
    const [loading, setLoading] = useState(false);

    const onSuccess = () => {
        Alert.alert("User has been updated.")
        Navigation.back();
    }
    const onFailed = () => {
        setLoading(false)
    }
    const updateUser = () => {
        if (name.length == 0) {
            Alert.alert("Please write your name.");
            return;
        }
        setLoading(true);
        saveUser({
            name: name,
            success: onSuccess,
            failure: onFailed
        });
    }

    const onLogout = () => {
        logout();
        AsyncStorage.clear();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => Navigation.back()} />
                    <Appbar.Content title="Details" />
                </Appbar.Header>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    <Image style={styles.logo} />


                    <Input placeholder={'Name'} style={styles.formView} value={name} onChange={(value) => setName(value)} />
                    {loading ? <ActivityIndicator color={THEME_COLOR} size={'large'} /> :
                        <React.Fragment>
                            <Button title={'Save'} style={{ marginTop: 20 }} onPress={() => updateUser()} />
                            <Button title={'Logout'} style={{ marginTop: 20, marginBottom: 20 }}
                                onPress={() => { onLogout() }} />
                        </React.Fragment>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: BACKGROUND_BODY_COLOR,
        flex: 1,
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
});

const mapStateToProps = state => ({
    user: state.user
});


const mapDispatchToProps = dispatch => ({
    saveUser: (data) => dispatch(actionCreators.updateUser(data)),
    logout: () => dispatch(actionCreators.logout())
    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Settings);
