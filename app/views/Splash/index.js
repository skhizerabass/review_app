import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND_BODY_COLOR, BACKGROUND_COLOR } from 'app/constants/colors';
import { actionCreators, userSave } from 'app/redux/actions/user';


const Splash = ({
    loadUser
}) => {

    useEffect(() => {
        setTimeout(() => {
            loadUser()
        }, 500)
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.title}>Restaurant Review</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: BACKGROUND_BODY_COLOR,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        marginTop: 20,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    }

})


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    saveUser: (user) => dispatch(userSave(user)),
    loadUser: () => dispatch(actionCreators.loadUser())
    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Splash);
