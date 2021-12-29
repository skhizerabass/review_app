import {
    take, put, call, fork, all,
} from 'redux-saga/effects';

import {
    onError,
} from 'app/utils/errorHandler';
import {
    apiUserRestaurants,
    apiUserRestaurantDetail,
    apiUserRestaurantReviews,
    apiUserCreateReview,
    apiRemoveReview,
    apiCreateRestaurant,
    apiUpdateRestaurant,
    apiSaveReply
} from 'app/lib/services/apis';

import {
    FETCH_USER_RESTAURANTS,
    actionCreators,
    FETCH_USER_REVIEW,
    FETCH_RESTAURANT_REVIEWS,
    FETCH_USER_RESTAURANT_DETAIL,
    FETCH_REMOVE_REVIEW,
    NEW_RESTAURANT,
    SAVE_REPLY,
    UPDATE_RESTAURANT
} from '../actions/restaurants';

export function* asyncUserRestaurants({ payload }) {
    const {
        success,
        failure,
    } = payload;

    try {
        let { data } = yield call(apiUserRestaurants);
        data = data.data;
        success && success(data);
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}

export function* asyncGetReviews({ payload }) {
    const {
        ID,
        success,
        failure,
    } = payload;

    try {
        let { data } = yield call(apiUserRestaurantReviews, ID);
        data = data.data;
        success && success(data);
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}


export function* asyncGetRestaurantDetails({ payload }) {
    const {
        ID,
        success,
        failure,
    } = payload;

    try {
        let { data } = yield call(apiUserRestaurantDetail, ID);
        data = data.data;
        success && success(data);
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}
export function* watchUserRestaurant() {
    while (true) {
        const action = yield take(FETCH_USER_RESTAURANTS);
        yield* asyncUserRestaurants(action);
    }
}

export function* watchUserRestaurantDetail() {
    while (true) {
        const action = yield take(FETCH_USER_RESTAURANT_DETAIL);
        yield* asyncGetRestaurantDetails(action);
    }
}
export function* watchRestaurantReviews() {
    while (true) {
        const action = yield take(FETCH_RESTAURANT_REVIEWS);
        yield* asyncGetReviews(action);
    }
}

export function* asyncCreateReview({ payload }) {
    const {
        review,
        success,
        failure,
    } = payload;
    try {

        yield call(apiUserCreateReview, review);
        success && success();
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}


export function* watchUserReview() {
    while (true) {
        const action = yield take(FETCH_USER_REVIEW);
        yield* asyncCreateReview(action);
    }
}

export function* asyncRemoveReview({ payload }) {
    const {
        ID,
        success,
        failure,
    } = payload;

    try {

        const { data } = yield call(apiRemoveReview, ID);

        success && success();
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}


export function* asyncCreateRestaurant({ payload }) {
    const {
        name,
        description,
        category,
        success,
        failure,
    } = payload;

    try {

        yield call(apiCreateRestaurant, { name, description, category });
        success && success();
    } catch (error) {
        // 
        yield onError(error);
        failure && failure();
    }
}


export function* asyncUpdateRestaurant({ payload }) {
    const {
        name,
        description,
        category,
        ID,
        success,
        failure,
    } = payload;

    try {

        yield call(apiUpdateRestaurant, { ID, name, description, category });
        success && success();
    } catch (error) {
        // 
        yield onError(error);
        failure && failure();
    }
}
export function* asyncSaveReply({ payload }) {
    const {
        ID,
        reply,
        success,
        failure,
    } = payload;
    try {

        yield call(apiSaveReply, { ID, reply });
        success && success();
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}
export function* watchRemoveReview() {
    while (true) {
        const action = yield take(FETCH_REMOVE_REVIEW);
        yield* asyncRemoveReview(action);
    }
}

export function* watchCreateRestaurant() {
    while (true) {
        const action = yield take(NEW_RESTAURANT);
        yield* asyncCreateRestaurant(action);
    }
}


export function* watchUpdateRestaurant() {
    while (true) {
        const action = yield take(UPDATE_RESTAURANT);
        yield* asyncUpdateRestaurant(action);
    }
}


export function* watchSaveReply() {
    while (true) {
        const action = yield take(SAVE_REPLY);
        yield* asyncSaveReply(action);
    }
}
export default function* () {
    yield all([
        fork(watchUserRestaurant),
        fork(watchUserRestaurantDetail),
        fork(watchRestaurantReviews),
        fork(watchUserReview),
        fork(watchRemoveReview),
        fork(watchCreateRestaurant),
        fork(watchUpdateRestaurant),
        fork(watchSaveReply)

    ]);
}
