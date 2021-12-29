import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { BACKGROUND_COLOR, THEME_COLOR } from '../../../constants/colors';
import RestaurantItem from '../../../presentations/RestaurantView';
import { Appbar } from 'react-native-paper';
import { actionCreators } from '../../../redux/actions/restaurants';
import { connect } from 'react-redux';
import Navigation from '../../../lib/services/Navigation';
import Filter from '../../../presentations/FilterBar';

const UserHome = ({ fetchRestaurants }) => {
    const [filterBar, setFilterBar] = useState([{ text: "All", value: -1 }, { text: "5 Stars", value: 5 }, { text: "4 Stars", value: 4 }, { text: "3 Stars", value: 3 }, { text: "2 Stars", value: 2 }, { text: "1 Star", value: 1 }, { text: "0 Star", value: 0 }]);
    const [filteredBy, setFilterBy] = useState(-1);
    const [filteredData, setFilteredData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([
    ])
    const [ratings, setRatings] = useState({});
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        filterList();
    }, [filteredBy, restaurants])

    //Filter Reviews by ranking
    const filterList = () => {
        let data = [];
        // 
        if (filteredBy === -1) {
            data = restaurants;
        } else if (filteredBy === 5) {
            restaurants.forEach(element => {
                if (element.rating === 5) {
                    data.push(element);
                }
            });
        } else if (filteredBy === 4) {
            restaurants.forEach(element => {
                if (element.rating === 4) {
                    data.push(element);
                }
            });
        } else if (filteredBy === 3) {
            restaurants.forEach(element => {
                if (element.rating === 3) {
                    data.push(element);
                }
            });
        } else if (filteredBy === 2) {
            restaurants.forEach(element => {
                if (element.rating === 2) {
                    data.push(element);
                }
            });
        } else if (filteredBy === 1) {
            restaurants.forEach(element => {
                if (element.rating === 1) {
                    data.push(element);
                }
            });
        } else if (filteredBy === 0) {
            restaurants.forEach(element => {
                if (element.rating === 0) {
                    data.push(element);
                }
            });
        }

        setFilteredData(data);
    }

    const onFetch = (data) => {
        if (data) {
            setRestaurants(data.restaurants);
            setRatings(data.ratings);
        }
        // 
        setLoading(false);
        setRefreshing(false);

    }

    const onFailure = () => {
        setLoading(false);

        setRefreshing(false);
    }

    const getRestaurants = () => {
        fetchRestaurants({
            success: onFetch,
            failure: onFailure,
        })
    }

    useEffect(() => {
        // console.log("WOW");
        setLoading(true);

        getRestaurants();

    }, [])

    const goToRestaurantDetails = (item) => {
        Navigation.navigate("Detail", { item, rating: ratings[item.ID] });
    }


    const selectFilter = (item) => {
        setFilterBy(item.value);
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
    const renderRestaurant = ({ item, index }) => {
        return (
            <RestaurantItem
                {...item}
                index={index}
                rating={ratings[item.ID]}
                onPress={() => { goToRestaurantDetails(item) }}
            />
        )
    }

    return (
        <View style={styles.status}>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Appbar.Header>
                        <Appbar.Content title="Restaurants" />
                        <Appbar.Action icon="menu" onPress={() => Navigation.navigate("Settings")} />
                    </Appbar.Header>
                    {loading ? <ActivityIndicator color={THEME_COLOR} /> :

                        restaurants.length ?
                            <React.Fragment>
                                <FlatList
                                    style={styles.flatList}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    data={filterBar}
                                    renderItem={filterBarItem}
                                />
                                <FlatList
                                    data={filteredData}
                                    keyExtractor={(item, index) => item.ID + index}
                                    renderItem={renderRestaurant}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={() => {
                                                setRefreshing(true)
                                                getRestaurants();
                                            }}
                                        />
                                    } />
                            </React.Fragment>
                            :
                            <View style={styles.tvMessage}>
                                <Text style={styles.text}>No Restaurant Found</Text>
                            </View>
                    }

                </View>
            </SafeAreaView>
        </View>)
}

const styles = StyleSheet.create({
    tvMessage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: THEME_COLOR
    },
    container: {
        backgroundColor: THEME_COLOR,
        flex: 1
    },
    status: {
        backgroundColor: THEME_COLOR,
        flex: 1,
    }
    ,
    flatList: {
        height: 50,
        marginTop: 10,
        flexGrow: 0
    }
})

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    fetchRestaurants: (data) => dispatch(actionCreators.fetchUserRestaurants(data)),
    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserHome);
