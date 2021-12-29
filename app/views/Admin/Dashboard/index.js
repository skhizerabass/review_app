import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { BACKGROUND_COLOR, THEME_ACCENT_COLOR, THEME_COLOR } from '../../../constants/colors';
import RestaurantItem from '../../../presentations/RestaurantView';
import { Appbar } from 'react-native-paper';
import { connect } from 'react-redux';
import Navigation from '../../../lib/services/Navigation';
import Review from '../../../presentations/Review';
import { useFocusEffect } from '@react-navigation/native';
import UserItem from '../../../presentations/User';
import { actionCreators } from '../../../redux/actions/admin';

const AdminDashboard = ({ getAllUsers, getAllRestaurants, deleteUserBasedOnID, deleteRestarantsBasedOnID }) => {
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([
    ])
    const [filterBy, setFilterByUser] = useState('All');
    const [users, setUsers] = useState([
    ])
    const [selected, setSelected] = useState(1);
    const [ratings, setRatings] = useState({});

    const [refreshing, setRefreshing] = useState(false);
    const onFetch = (data) => {

        if (data) {
            setUsers(data.users);
            // 
        }
        // 
        setLoading(false);
        setRefreshing(false);

    }
    const onFetchRestaurants = (data) => {

        if (data) {
            setRestaurants(data.restaurants);
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
        getAllUsers({
            success: onFetch,
            failure: onFailure,
        })
        getAllRestaurants({
            success: onFetchRestaurants,
            failure: onFailure,
        })

    }

    useFocusEffect(
        React.useCallback(() => {

            setLoading(true);

            init();
        }, [])
    );

    const onSuccessfulRemove = () => {
        // setLoading(false);
        init();
    }
    const onFailureRemove = () => {
        setLoading(false);
    }

    const deleteUserFromDb = (item) => {
        const { ID } = item;
        Alert.alert(
            "Alert",
            "This action will delete user completely from the app. This action will also remove any Restaurant Or Review created by this user.",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        setLoading(true);

                        deleteUserBasedOnID({
                            ID,
                            success: onSuccessfulRemove,
                            failure: onFailureRemove

                        });
                    }
                }
            ]
        );

    };

    const deleteRestaurantFromDB = (item) => {
        const { ID } = item;
        Alert.alert(
            "Alert",
            "This action will delete this restaurant from the app. This action will also remove all the Reviewies and replies from the restaurant.",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        setLoading(true);

                        deleteRestarantsBasedOnID({
                            ID,
                            success: onSuccessfulRemove,
                            failure: onFailureRemove

                        });
                    }
                }
            ]
        );

    };




    const goToRestaurantDetails = (item) => {
        Navigation.navigate("ReviewList", { item, rating: ratings[item.ID] });
    }

    const renderRestaurant = ({ item, index }) => {
        return (
            <RestaurantItem
                {...item}
                onPress={() => { goToRestaurantDetails(item) }}
                index={index}
                removeRestaurant={() => { deleteRestaurantFromDB(item) }}
                admin
                rating={ratings[item.ID]}
            />

        )
    }

    const renderUser = ({ item, index }) => {
        let currentItem = null;
        if (filterBy === "All") {
            currentItem = item;
        }
        else if (filterBy.toLowerCase() === item.type.toLowerCase()) {
            currentItem = item;
        }
        return (
            currentItem ?
                <UserItem
                    {...item}
                    index={index}
                    removeUser={() => { deleteUserFromDb(item) }}
                /> : null
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
                    <React.Fragment>
                        <View style={styles.tabButtonsView}>
                            <TouchableOpacity onPress={() => { setSelected(1) }} style={[styles.leftTab, styles.tabButton, selected === 1 ? styles.tabButtonSelected : styles.tabButtonUnSelected]}>
                                <Text style={[styles.tabBtnText, selected === 1 ? styles.selectedTabBttnText : null]}>{"All\nUsers"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setSelected(2) }} style={[styles.righTab, styles.tabButton, selected === 2 ? styles.tabButtonSelected : styles.tabButtonUnSelected]}>
                                <Text style={[styles.tabBtnText, selected === 2 ? styles.selectedTabBttnText : null]}>{"All\nRestaurants"}</Text>
                            </TouchableOpacity>
                        </View>

                        {selected === 1 ?
                            <React.Fragment>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={[filterBy === 'All' ? styles.filterByUsers : styles.unselectedButton]}
                                        onPress={() => setFilterByUser('All')}
                                    >
                                        <Text style={[filterBy === 'All' ? styles.filterByUsersText : styles.unselectedText]}>All</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[filterBy === 'Customer' ? styles.filterByUsers : styles.unselectedButton]}
                                        onPress={() => setFilterByUser('Customer')}
                                    >
                                        <Text style={[filterBy === 'Customer' ? styles.filterByUsersText : styles.unselectedText]}>Customer</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[filterBy === 'Owner' ? styles.filterByUsers : styles.unselectedButton]}
                                        onPress={() => setFilterByUser('Owner')}
                                    >
                                        <Text style={[filterBy === 'Owner' ? styles.filterByUsersText : styles.unselectedText]}>Owner</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={users}
                                    extraData={selected}
                                    contentContainerStyle={{ paddingVertical: 20 }}
                                    keyExtractor={(item, index) => item.ID + index}
                                    renderItem={renderUser}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={() => {
                                                setRefreshing(true)
                                                init();
                                            }}
                                        />
                                    } />
                            </React.Fragment>
                            :
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
                                } />}
                    </React.Fragment>
                }
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: '#FFFFFF',
        flex: 1,
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
    filterByUsers: {
        backgroundColor: THEME_COLOR,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20
    },
    filterByUsersText: {
        fontSize: 16,
        color: '#FFF'
    },
    unselectedButton: {
        borderColor: THEME_COLOR,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20
    },
    unselectedText: {
        fontSize: 16,
        color: '#000000'
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
    getAllUsers: (data) => dispatch(actionCreators.getAllUsers(data)),
    getAllRestaurants: (data) => dispatch(actionCreators.getAllRestaurants(data)),
    deleteUserBasedOnID: (data) => dispatch(actionCreators.removeUser(data)),
    deleteRestarantsBasedOnID: (data) => dispatch(actionCreators.removeRestaurant(data))

    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdminDashboard);
