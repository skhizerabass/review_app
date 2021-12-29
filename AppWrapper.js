/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from 'app/lib/services/Navigation';
import { StatusBar, View } from 'react-native';
import { THEME_ACCENT_COLOR, THEME_COLOR } from './app/constants/colors';
import Screens from './app/views';

const {
    Splash,
    UserHome,
    CreateReview,
    Settings,
    Owner,
    OwnerDashboard,
    RestaurantForm,
    ReplyForm,
    Dashboard,
    RestaurantDetail,
    ReviewList,
    User,
    Login,
    Signup
} = Screens;

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: THEME_COLOR,
        accent: THEME_ACCENT_COLOR,
    },
};

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen component={Login} name={'Login'} />
            <Stack.Screen component={Signup} name={'Signup'} />
            <Stack.Screen component={Owner} name={'Owner'} />
            <Stack.Screen component={User} name={'User'} />

        </Stack.Navigator>
    )
}

const OwnerNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen component={OwnerDashboard} name={'OwnerDashboard'} />
            <Stack.Screen component={RestaurantDetail} name={'Detail'} />
            <Stack.Screen component={Settings} name={'Settings'} />
            <Stack.Screen component={ReviewList} name={'ReviewList'} />
            <Stack.Screen component={ReplyForm} name={'ReplyForm'} />
            <Stack.Screen component={RestaurantForm} name={'RestaurantForm'} />

        </Stack.Navigator>
    )
}

const CustomerNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen component={UserHome} name={'UserHome'} />
            <Stack.Screen component={ReviewList} name={'ReviewList'} />
            <Stack.Screen component={RestaurantDetail} name={'Detail'} />
            <Stack.Screen component={Settings} name={'Settings'} />
            <Stack.Screen component={CreateReview} name={'CreateReview'} />

        </Stack.Navigator>
    )
}

const AdminNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen component={Dashboard} name={'AdminDashboard'} />
            <Stack.Screen component={ReviewList} name={'ReviewList'} />
            <Stack.Screen component={RestaurantDetail} name={'Detail'} />
            <Stack.Screen component={Settings} name={'Settings'} />

        </Stack.Navigator>
    )
}


const LoadingNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen component={Splash} name={'Splash'} />
        </Stack.Navigator>
    )
}

const AppWrapper = ({ user }) => {
    let currentNavigator = <LoadingNavigator />;
    // console.log(user);
    if (!user.loading) {
        if (user.user) {
            switch (user.user.type) {
                case 'Admin':
                    currentNavigator = <AdminNavigator />
                    break;

                case 'Customer':
                    currentNavigator = <CustomerNavigator />
                    break;

                case 'Owner':
                    currentNavigator = <OwnerNavigator />
                    break;
            }
        } else {
            currentNavigator = <AuthNavigator />;
        }
    }

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer ref={Navigation.navigationRef}>
                <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />

                {currentNavigator}
            </NavigationContainer>
        </PaperProvider>
    )
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    // saveToken: () => dispatch(saveToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppWrapper);
