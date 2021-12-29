import {
    take, put, call, fork, all,
} from 'redux-saga/effects';

import {
    onError,
} from 'app/utils/errorHandler';
import {
    apiLogin,
    apiUpdateUser,
    apiSignup,
    verifyUser

} from 'app/lib/services/apis';
import {
    setAuthToken,
    removeAuthToken,
} from 'app/lib/services/apiInstance'

import {
    LOGIN,
    AUTH_TOKEN,
    actionCreators,
    LOGIN_SUCCESS,
    LOAD_USER,
    SAVE_USER,
    SIGNUP_USER,
    LOGOUT
} from '../actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* asyncLogin({ payload }) {
    const {
        email,
        password,
        success,
        failure,
    } = payload;

    try {

        removeAuthToken();

        let { data } = yield call(apiLogin, email, password);
        data = data.data;
        AsyncStorage.setItem("USER", JSON.stringify(data));
        // 
        yield put({ type: LOGIN_SUCCESS, user: data });

        setAuthToken(`${data.accessToken} ${data.ID}`);

        success && success();
    } catch (error) {

        if (error) {
            yield onError(error);
        } else {
            yield onError();

        }
        failure && failure();
    }
}

//Verifying User if user is logged in and verified from server. On failing user will be logged out 
export function* loadData() {
    while (true) {
        const action = yield take(LOAD_USER);
        let data = yield AsyncStorage.getItem("USER");
        try {
            if (data) {
                data = JSON.parse(data);

                if (data.accessToken) {
                    setAuthToken(`${data.accessToken} ${data.ID}`);
                    const user = yield call(verifyUser);

                    if (user.data.status = 'Success') {
                        yield put({ type: LOGIN_SUCCESS, user: data });
                    }
                } else {
                    yield AsyncStorage.clear();
                    yield put(actionCreators.logout());

                }
            } else {
                yield AsyncStorage.clear();
                yield put(actionCreators.logout());

            }
        } catch (error) {


            if (error.code === 'logout') {

                yield onError({ message: "You have been logged Out" });
                yield put(actionCreators.logout());
            } else {
                yield onError(error);
            }
        }
    }
}

export function* watchLogin() {
    while (true) {
        const action = yield take(LOGIN);
        yield* asyncLogin(action);
    }
}

export function* watchInit() {
    const data = yield AsyncStorage.getItem("USER");
    if (data) {
        yield put(actionCreators.loginSuccess({ user: data }));
    } else {
        yield put(actionCreators.logout());
    }
}

export function* watchAuthToken() {
    while (true) {
        const action = yield take(AUTH_TOKEN);
        yield* asyncAuthToken(action);
    }
}


export function* fetchData() {
    try {
        const res = yield all([
            //
        ]);

        const index = res.findIndex(item => item.type === 'error');
        if (index !== -1) {
            return res[index];
        }

        return {
            type: 'success',
        };
    } catch (error) {
        return {
            type: 'error',
            error,
        };
    }

}

export function* asyncSaveUser({ payload }) {
    const { name, success, failure } = payload;
    try {

        yield call(apiUpdateUser, name);
        let user = yield AsyncStorage.getItem("USER");
        user = JSON.parse(user);
        user.name = name;
        yield AsyncStorage.setItem("USER", JSON.stringify(user));
        yield put({ type: LOGIN_SUCCESS, user });

        success && success();
    } catch (error) {

        yield onError(error);
        failure && failure();

    }
}

export function* asyncSignup({ payload }) {
    const { email, password, name, type, success, failure } = payload;
    try {

        let { data } = yield call(apiSignup, { email, password, name, type });
        data = data.data;
        AsyncStorage.setItem("USER", JSON.stringify(data));
        // 
        yield put({ type: LOGIN_SUCCESS, user: data });

        setAuthToken(`${data.accessToken} ${data.ID}`);

        success && success();
    } catch (error) {

        yield onError(error);
        failure && failure();

    }
}

export function* watchUser() {
    while (true) {
        const action = yield take(SAVE_USER);
        yield* asyncSaveUser(action);
    }
}


export function* watchSignUp() {
    while (true) {
        const action = yield take(SIGNUP_USER);
        yield* asyncSignup(action);
    }
}

export default function* () {
    yield all([
        fork(watchLogin),
        fork(watchAuthToken),
        fork(loadData),
        fork(watchUser),
        fork(watchSignUp)
    ]);
}
