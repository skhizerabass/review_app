import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { BACKGROUND_BODY_COLOR, BACKGROUND_COLOR, THEME_ACCENT_COLOR, THEME_COLOR } from '../../../constants/colors';
import RestaurantItem from '../../../presentations/RestaurantView';
import { Appbar } from 'react-native-paper';
import { actionCreators } from '../../../redux/actions/restaurants';
import { connect } from 'react-redux';
import Navigation from '../../../lib/services/Navigation';
import Review from '../../../presentations/Review';
import { useFocusEffect } from '@react-navigation/native';
import Button from '../../../components/Button';

const OwnerDashboard = ({ dashboardInit }) => {
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([
    ])
    const [selected, setSelected] = useState(1);
    const [ratings, setRatings] = useState({});
    const [pendingReviews, setPendingReviews] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const onFetch = (data) => {

        if (data) {
            setRestaurants(data.restaurants);
            setPendingReviews(data.pendingReviews);
            setRatings(data.ratings);
            // 
        }
        // 
        setLoading(false);
        setRefreshing(false);

    }
    const onFailure = () => {
        setLoading(false);

        setRefreshing(false);
    }
    const init = () => {
        dashboardInit({
            success: onFetch,
            failure: onFailure,
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);

            init();
        }, [])
    );


    const goToRestaurantDetails = (item) => {
        Navigation.navigate("Detail", { item, rating: ratings[item.ID] });
    }

    const renderRestaurant = ({ item, index }) => {
        return (
            <RestaurantItem
                {...item}
                updateRestaurant={() => { Navigation.navigate("RestaurantForm", item) }}
                index={index}
                rating={ratings[item.ID]}
                onPress={() => { goToRestaurantDetails(item) }}
            />

        )
    }

    const renderReview = ({ item, index }) => {
        // console.log(item);
        return (

            <Review
                {...item}
                style={{ marginHorizontal: 20 }}
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
                    <Appbar.Content title="Restaurants" />
                    <Appbar.Action icon="menu" onPress={() => Navigation.navigate("Settings")} />
                    <Appbar.Action icon="plus" onPress={() => Navigation.navigate("RestaurantForm")} />

                </Appbar.Header>
                {loading ? <ActivityIndicator color={THEME_COLOR} /> :

                    restaurants.length ?
                        <React.Fragment>
                            <View style={styles.tabButtonsView}>
                                <TouchableOpacity onPress={() => { setSelected(1) }} style={[styles.leftTab, styles.tabButton, selected === 1 ? styles.tabButtonSelected : styles.tabButtonUnSelected]}>
                                    <Text style={[styles.tabBtnText, selected === 1 ? styles.selectedTabBttnText : null]}>{"My\nRestaurants"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setSelected(2) }} style={[styles.righTab, styles.tabButton, selected === 2 ? styles.tabButtonSelected : styles.tabButtonUnSelected]}>
                                    <Text style={[styles.tabBtnText, selected === 2 ? styles.selectedTabBttnText : null]}>{"Pending\nReviews"}</Text>
                                </TouchableOpacity>
                            </View>

                            {selected === 1 ?
                                <FlatList
                                    data={restaurants}
                                    extraData={selected}
                                    contentContainerStyle={{ paddingVertical: 20 }}
                                    keyExtractor={(item, index) => item.ID + index}
                                    renderItem={renderRestaurant}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={() => {
                                                setRefreshing(true)
                                                init();
                                            }}
                                        />
                                    } />
                                :
                                <FlatList
                                    data={pendingReviews}
                                    extraData={selected}
                                    contentContainerStyle={{ paddingVertical: 20 }}
                                    keyExtractor={(item, index) => item.ID + index}
                                    renderItem={renderReview}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={() => {
                                                setRefreshing(true)
                                                init();
                                            }}
                                        />
                                    } />}
                        </React.Fragment>
                        :
                        <View style={styles.ctaView}>
                            <Button title={"Create new restaurant"} onPress={() => Navigation.navigate("RestaurantForm")} />
                        </View>
                }
            </View>
        </SafeAreaView>)
}

const styles = StyleSheet.create({
    ctaView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    overlay: {
        backgroundColor: BACKGROUND_BODY_COLOR,
        flex: 1
    },
    container: {
        backgroundColor: BACKGROUND_COLOR,
        flex: 1
    },
    tabButtonsView: {
        flexDirection: 'row',
    },
    leftTab: {
        marginRight: 10,
        marginLeft: 20,
    },
    righTab: {
        marginLeft: 10,
        marginRight: 20,

    },
    tabButton: {


        flex: 1,
        padding: 15,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabBtnText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black'

    },
    selectedTabBttnText: {
        color: 'white'
    },
    tabButtonSelected: {
        borderRadius: 10,
        backgroundColor: THEME_ACCENT_COLOR,
    },
    tabButtonUnSelected: {
        borderColor: THEME_ACCENT_COLOR,
        borderWidth: 1,
        borderRadius: 10
    }
})

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    dashboardInit: (data) => dispatch(actionCreators.dashboardInit(data)),
    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OwnerDashboard);
