import {
    take, put, call, fork, all,
} from 'redux-saga/effects';

import {
    onError,
} from 'app/utils/errorHandler';
import {
    apiGetAllUers,
    apiGetAllRestaurants,
    removeUser
} from 'app/lib/services/apis';
import {
    GET_RESTAURANTS,
    GET_USERS,
    REMOVE_RESTAURANT,
    REMOVE_USER
} from '../actions/admin';
import { removeRestaurant } from '../../lib/services/apis';

export function* asyncDashboard({ payload }) {
    const {
        success,
        failure,
    } = payload;
    try {
        let { data } = yield call(apiGetAllUers);

        success && success(data.data);
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}

export function* asyncRestaurants({ payload }) {
    const {
        success,
        failure,
    } = payload;
    try {
        let { data } = yield call(apiGetAllRestaurants);

        success && success(data.data);
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}

export function* asyncRemoveUser({ payload }) {
    const { ID, success, failure } = payload;
    try {
        let { data } = yield call(removeUser, { ID });

        success && success(data.data);
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}


export function* asyncRemoveRestaurant({ payload }) {
    const { ID, success, failure } = payload;
    try {
        let { data } = yield call(removeRestaurant, { ID });

        success && success();
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}

export function* watchDashboard() {
    while (true) {
        const action = yield take(GET_USERS);

        yield* asyncDashboard(action);
    }
}

export function* watchDashboardRestaurants() {
    while (true) {
        const action = yield take(GET_RESTAURANTS);

        yield* asyncRestaurants(action)
    }
}

export function* watchRemoveUser() {
    while (true) {
        const action = yield take(REMOVE_USER);

        yield* asyncRemoveUser(action)
    }
}


export function* watchRemoveRestaurant() {
    while (true) {
        const action = yield take(REMOVE_RESTAURANT);

        yield* asyncRemoveRestaurant(action)
    }
}


export default function* () {
    yield all([
        fork(watchDashboard),
        fork(watchDashboardRestaurants),
        fork(watchRemoveUser),
        fork(watchRemoveRestaurant)
    ]);
}
