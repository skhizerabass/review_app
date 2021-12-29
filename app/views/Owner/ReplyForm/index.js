import React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, View, } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { actionCreators } from 'app/redux/actions/restaurants';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import { BACKGROUND_COLOR, THEME_COLOR } from 'app/constants/colors';
import Navigation from 'app/lib/services/Navigation';
import { Rating } from 'react-native-ratings';
import { BACKGROUND_BODY_COLOR } from '../../../constants/colors';

const ReplyForm = ({ saveReply, route }) => {
    const item = route.params;
    const [description, setDescription] = useState(item && item.content ? item.content : '');
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState(item && item.reply ? item.reply : '');
    const [rating, setRating] = useState(item.rating);
    const onSuccess = () => {
        var message = "Review has been saved successfully."
        if (item.ID) {
            message = "Review has been successfully Updated."
        }
        Alert.alert("Congratulations!", message);
        Navigation.back();
    }

    const onFailure = () => {
        setLoading(false);
    }

    const onSave = () => {
        if (!reply.length) {
            Alert.alert('Warning', 'Please write a proper reply.')
            return;
        }
        setLoading(true);
        saveReply({
            ID: item.ID,
            reply,
            success: onSuccess,
            failure: onFailure
        });
        return;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => Navigation.back()} />
                    <Appbar.Content title="Review" />
                </Appbar.Header>

                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                >


                    <Rating
                        type='star'
                        ratingBackgroundColor={'transparent'}
                        imageSize={50}
                        startingValue={rating}
                        showRating
                        readonly
                        showReadOnlyText={false}
                        style={{ marginTop: 20 }}
                    />

                    <TextInput
                        multiline
                        disabled={true}
                        mode="outlined"
                        numberOfLines={4}
                        scrollEnabled
                        style={{ marginTop: 20 }}
                        value={description ? description : 'No comments'}

                        onChangeText={(description) => { setDescription(description) }}
                    />

                    <TextInput
                        multiline
                        placeholder="Write somethiing about the above comment"
                        mode="outlined"
                        maxLength={150}
                        numberOfLines={4}
                        style={{ marginTop: 20 }}
                        value={reply}
                        right={<TextInput.Affix text={`${reply.length}/150`} />}
                        onChangeText={(reply) => { setReply(reply) }}
                    />
                    {loading ?
                        <ActivityIndicator color={THEME_COLOR} size={'large'} style={styles.loader} />
                        :
                        <Button title={'Save'} style={{ marginTop: 20 }} onPress={onSave} />
                    }
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
    loader: {
        justifyContent: 'center',
        alignContent: 'center'
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
});

const mapDispatchToProps = dispatch => ({
    saveReply: (data) => dispatch(actionCreators.saveReply(data)),

    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReplyForm);
