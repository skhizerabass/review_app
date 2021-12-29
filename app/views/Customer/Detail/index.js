import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';

import { BACKGROUND_COLOR, THEME_COLOR, THEME_SECONDARY_COLOR } from 'app/constants/colors';
import Review from 'app/presentations/Review';
import Icon from 'react-native-vector-icons/FontAwesome';
import { actionCreators } from 'app/redux/actions/restaurants';
import { useFocusEffect } from '@react-navigation/native';
import Navigation from '../../../lib/services/Navigation';
import { BACKGROUND_BODY_COLOR } from '../../../constants/colors';


const RestaurantDetail = ({ user, route, fetchRestaurants, removeReview }) => {
    // console.log(route.params.item);
    const { item, rating } = route.params;
    const [loading, setLoading] = useState(true);
    const [restaurant, setRestaurant] = useState(null);
    const [ratings, setRating] = useState(null);
    const [reviews, setReviews] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchRestaurantData();
        }, [])
    );

    const onSuccess = (data) => {
        setLoading(false);
        // 
        setRestaurant(data.restaurant[0]);
        setReviews(data.reviews);
        setRating(data.ratings)
    }

    const onFailure = () => {
        setLoading(false);

    }
    const fetchRestaurantData = () => {
        setLoading(true);
        fetchRestaurants({
            ID: item.ID,
            success: onSuccess,
            failure: onFailure
        })
    }

    const removeComment = (ID) => {
        setLoading(true);

        removeReview({
            ID,
            success: fetchRestaurantData,
            failure: onFailure
        })

    }
    // const { currentItem, setItem } = useState({ ...item });
    // const [item, setItem] = useState()
    const replyUser = () => {

    }
    const renderReview = ({ item, index }) => {
        return (
            <Review
                {...item}
                removeComment={() => removeComment(item.ID)}
                index={index}
                onReply={() => Navigation.navigate("ReplyForm", item)}
            />
        )
    }

    const currentItem = restaurant && restaurant.Name ? restaurant : item;
    const currentRating = ratings && ratings.count ? ratings : rating;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => Navigation.back()} />
                    <Appbar.Content title="Details" />
                    {user.user && user.user.type === "Customer" ?
                        <Appbar.Action icon="plus" onPress={() => Navigation.navigate('CreateReview', { item })} /> :
                        null
                    }
                </Appbar.Header>
                {loading ? <ActivityIndicator style={{ alignSelf: 'center' }} color={THEME_COLOR} size={'large'} /> :
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>

                        <View style={styles.detailView}>
                            <Image style={styles.image} />
                            <View style={styles.infoView}>
                                <Text style={styles.title}>{currentItem.Name}</Text>
                                <View style={styles.ratingView}>
                                    <Rating
                                        type='star'
                                        ratingBackgroundColor={'transparent'}
                                        startingValue={currentRating ? currentRating.rating / currentRating.count : 0}
                                        style={{ alignSelf: 'flex-start', paddingTop: 5, borderWidth: 0 }}
                                        imageSize={16}
                                        isDisabled={true}
                                        readonly
                                        showReadOnlyText={false}
                                    />
                                    <Text style={styles.reviewsCount}>({currentRating ? currentRating.count : 0})</Text>

                                </View>
                                <Text style={styles.category}>{currentItem.Category}</Text>
                            </View>


                        </View>
                        <Text style={[styles.heading]}>
                            About this restaurant
                        </Text>

                        <Text style={styles.description}>
                            {currentItem.Description}
                        </Text>
                        <TouchableOpacity style={styles.aboutView} onPress={() => Navigation.navigate('ReviewList', { item })}>

                            <Text style={[styles.heading, { flex: 1, marginTop: 0 }]}>
                                Ratings and reviews
                            </Text>
                            <Icon name={'arrow-right'} size={25} color={'#000'} />

                        </TouchableOpacity>
                        {reviews && reviews.length ?
                            <FlatList
                                style={{ paddingBottom: 20 }}
                                data={reviews}
                                keyExtractor={(item, index) => item.ID + index}
                                renderItem={renderReview}

                            /> : null}
                    </ScrollView>}
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: BACKGROUND_BODY_COLOR,
        flex: 1,
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
    title: {
        fontSize: 28,
        includeFontPadding: false,
        fontWeight: 'bold',
        color: '#000'
    },
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
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
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchRestaurants: (data) => dispatch(actionCreators.fetchRestaurantDetail(data)),
    removeReview: (data) => dispatch(actionCreators.removeReview(data))
    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RestaurantDetail);
