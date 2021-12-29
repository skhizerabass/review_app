import React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { actionCreators } from 'app/redux/actions/restaurants';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import { BACKGROUND_COLOR, THEME_COLOR } from 'app/constants/colors';
import Navigation from 'app/lib/services/Navigation';

const ReplyForm = ({ saveRestaurant, route, updateRestaurant }) => {
    const item = route.params;
    const [description, setDescription] = useState(item && item.Description ? item.Description : '');
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState(item && item.reply ? item.reply : '');

    const onSuccess = () => {
        var message = "Restaurant has been saved successfully."
        if (item.ID) {
            message = "Restaurant has been successfully Updated."
        }
        Alert.alert("Congratulations!", message);
        Navigation.back();
    }

    const onFailure = () => {
        setLoading(false);
    }
    const onSave = () => {
        if (!title.length) {
            Alert.alert('Warning', 'Please provide your restaurant name.')
            return;
        }

        if (!category.length) {
            Alert.alert('Warning', 'Please write the category.')
            return;
        }


        if (!description.length) {
            Alert.alert('Warning', 'Please let us know more about your restaurant.')
            return;
        }

        setLoading(true);
        if (!item.ID) {
            saveRestaurant({
                name: title,
                description,
                category,
                success: onSuccess,
                failure: onFailure
            });
            return;
        }

        updateRestaurant({
            name: title,
            ID: item.ID,
            description,
            category,
            success: onSuccess,
            failure: onFailure
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => Navigation.back()} />
                <Appbar.Content title="Restaurants" />
            </Appbar.Header>

            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 20 }}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >

                <TextInput
                    multiline
                    disabled={true}
                    mode="outlined"
                    maxLength={150}
                    numberOfLines={4}
                    style={{ marginTop: 20 }}
                    value={description}
                    right={<TextInput.Affix text={`${description.length}/150`} />}
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loader: { justifyContent: 'center', alignContent: 'center' },
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
    saveRestaurant: (data) => dispatch(actionCreators.createRestaurant(data)),
    updateRestaurant: (data) => dispatch(actionCreators.updateRestaurant(data)),

    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReplyForm);
