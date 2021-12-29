import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { BACKGROUND_COLOR, THEME_COLOR, THEME_SECONDARY_COLOR } from 'app/constants/colors';
import Review from 'app/presentations/Review';
import { useFocusEffect } from '@react-navigation/native';
import { actionCreators } from 'app/redux/actions/restaurants';
import { connect } from 'react-redux';
import Navigation from 'app/lib/services/Navigation';
import { BACKGROUND_BODY_COLOR } from 'app/constants/colors';
import Filter from 'app/presentations/FilterBar';


const ReviewList = ({ fetchReviews, route, removeReview }) => {
    const { item } = route.params;
    const [filterBar, setFilterBar] = useState([{ text: "All", value: -1 }, { text: "5 Stars", value: 5 }, { text: "4 Stars", value: 4 }, { text: "3 Stars", value: 3 }, { text: "2 Stars", value: 2 }, { text: "1 Star", value: 1 }, { text: "0 Star", value: 0 }]);
    const [filteredBy, setFilteredBy] = useState(-1);
    const [reviews, setReviews] = useState([
    ]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchReviewsData();
        }, [])
    );

    useEffect(() => {
        filterList();
    }, [filteredBy, reviews])

    //Filter Reviews by ranking
    const filterList = () => {
        let data = [];
        // 
        if (filteredBy === -1) {
            data = reviews;
        } else if (filteredBy === 5) {
            reviews.forEach(element => {
                if (element.rating === 5) {
                    data.push(element);
                }
            });
        } else if (filteredBy === 4) {
            reviews.forEach(element => {
                if (element.rating === 4) {
                    data.push(element);
                }
            });
        } else if (filteredBy === 3) {
            reviews.forEach(element => {
                if (element.rating === 3) {
                    data.push(element);
                }
            });
        } else if (filteredBy === 2) {
            reviews.forEach(element => {
                if (element.rating === 2) {
                    data.push(element);
                }
            });
        } else if (filteredBy === 1) {
            reviews.forEach(element => {
                if (element.rating === 1) {
                    data.push(element);
                }
            });
        } else if (filteredBy === 0) {
            reviews.forEach(element => {
                if (element.rating === 0) {
                    data.push(element);
                }
            });
        }

        setFilteredData(data);
    }

    const onSuccess = (data) => {
        setLoading(false);
        setRefreshing(false);
        setReviews(data);
        // filterList();

    }

    const onFailure = () => {
        setLoading(false);
        setRefreshing(false);

    }
    const fetchReviewsData = () => {
        fetchReviews({
            ID: item.ID,
            success: onSuccess,
            failure: onFailure
        })
    }

    const removeComment = (ID) => {
        // console.log(ID);
        Alert.alert(
            "Alert",
            "This action will remove this review permanently.",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        setLoading(true);

                        removeReview({
                            ID,
                            success: fetchReviewsData,
                            failure: onFailure
                        })
                    }
                }
            ]
        );


    }

    const selectFilter = (item) => {
        setFilteredBy(item.value);
        // filterList();
    }

    const filterBarItem = ({ item, index }) => {
        return (
            <Filter
                selected={filteredBy}
                {...item}
                onPress={() => { selectFilter(item) }} />
        )
    }

    const renderReview = ({ item, index }) => {
        let currentItem = null;

        return (
            <Review
                {...item}
                removeComment={() => removeComment(item.ID)}
                index={index}
                onReply={() => Navigation.navigate("ReplyForm", item)}

            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => Navigation.back()} />
                    <Appbar.Content title="Reviews" />
                </Appbar.Header>
                {loading ? <ActivityIndicator color={THEME_COLOR} size={'large'} /> :
                    <React.Fragment>
                        <FlatList
                            style={styles.flatList}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={filterBar}
                            renderItem={filterBarItem}
                        />
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            style={{ paddingBottom: 20, paddingHorizontal: 20 }}
                            data={filteredData}
                            renderItem={renderReview}
                            keyExtractor={(item, index) => item.ID + " " + index}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => {
                                        setRefreshing(true)
                                        fetchReviewsData();
                                    }}
                                />
                            }
                        />
                    </React.Fragment>
                }
            </View>
        </SafeAreaView >
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
    flatList: {
        height: 50,
        marginTop: 10,
        flexGrow: 0
    }

})

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    fetchReviews: (data) => dispatch(actionCreators.fetchReviews(data)),
    removeReview: (data) => dispatch(actionCreators.removeReview(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReviewList);
