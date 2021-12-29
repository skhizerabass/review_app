import {
    take, put, call, fork, all,
} from 'redux-saga/effects';

import {
    onError,
} from 'app/utils/errorHandler';
import {
    apiInitDashboard
} from 'app/lib/services/apis';
import {
    DASHBOARD_INIT
} from '../actions/restaurants';

export function* asyncDashboard({ payload }) {
    const {
        success,
        failure,
    } = payload;
    try {
        let { data } = yield call(apiInitDashboard);

        success && success(data.data);
    } catch (error) {

        yield onError(error);
        failure && failure();
    }
}

export function* watchDashboard() {
    while (true) {
        const action = yield take(DASHBOARD_INIT);
        yield* asyncDashboard(action);
    }
}

export default function* () {
    yield all([
        fork(watchDashboard),

    ]);
}
