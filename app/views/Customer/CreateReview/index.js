import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import DatePicker from 'react-native-date-picker'

import { BACKGROUND_COLOR, THEME_COLOR, THEME_SECONDARY_COLOR } from 'app/constants/colors';

import Navigation from 'app/lib/services/Navigation';
import { Rating } from 'react-native-ratings';
import Button from 'app/components/Button';
import { actionCreators } from 'app/redux/actions/restaurants';
import moment from 'moment';
import { FORMAT } from 'app/constants/configs';
import { BACKGROUND_BODY_COLOR } from 'app/constants/colors';


const CreateReview = ({ route, createReview }) => {
    // console.log(route.params.item);
    const { item } = route.params;
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(3);

    const onSuccess = () => {
        setLoading(false);
        Navigation.back();

    }

    const onFailure = () => {
        setLoading(false);

    }
    const createReviewsData = (review) => {
        setLoading(true);
        createReview({
            review,
            success: onSuccess,
            failure: onFailure
        })
    }

    const onSubmit = () => {
        if (!content.length) {
            Alert.alert("Please write a review");
            return;
        }

        const review = {
            ID: item.ID,
            content,
            rating,
            visit: moment(date).format(FORMAT),
        }

        createReviewsData(review);
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => Navigation.back()} />
                    <Appbar.Content title="Review" />
                </Appbar.Header>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>

                    <Text style={[styles.heading]}>
                        Write a Review
                    </Text>

                    <TextInput
                        multiline
                        mode="outlined"
                        maxLength={150}
                        numberOfLines={4}
                        value={content}
                        right={<TextInput.Affix text={`${content.length}/150`} />}
                        onChangeText={(content) => { setContent(content) }}
                    />


                    <Rating
                        type='star'
                        ratingBackgroundColor={'transparent'}
                        imageSize={50}
                        startingValue={rating}
                        style={{ marginTop: 20 }}
                        onFinishRating={(value) => { setRating(value) }}
                    />

                    <Text style={[styles.heading]}>
                        Visited On
                    </Text>

                    <DatePicker
                        mode="date"
                        maximumDate={new Date()}
                        date={date}
                        onDateChange={setDate}

                    />
                    {loading ? <ActivityIndicator color={THEME_COLOR} size={'large'} /> :
                        <Button title={'Submit'} style={{ marginTop: 20 }} onPress={onSubmit} />
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
    description: {
        fontSize: 14,
        marginTop: 10,
        color: THEME_SECONDARY_COLOR
    },
    ratingView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    category: {
        fontSize: 14,
        marginTop: 10,
        color: THEME_SECONDARY_COLOR
    },
    aboutView: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewsCount: {
        fontSize: 12,
        marginTop: 2,
        color: '#AEAEAE',
        marginLeft: 5,
    },
    date: {
        fontSize: 16,
        marginTop: 2,
        color: '#AEAEAE',
    },
    title: {
        fontSize: 28,
        includeFontPadding: false,
        fontWeight: 'bold',
        color: '#000'
    },
    container: {
        backgroundColor: BACKGROUND_COLOR,
        flex: 1
    },
    infoView: {
        flex: 1,
        marginLeft: 10,
        alignSelf: 'flex-start'
    },
    body: {
        paddingHorizontal: 20
    },
    image: {
        backgroundColor: THEME_COLOR,
        borderRadius: 5,
        height: 80,
        width: 80
    },
    detailView: {
        marginTop: 20,
        flexDirection: 'row'
    },

})

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    createReview: (data) => dispatch(actionCreators.createReview(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateReview);
