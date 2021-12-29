import { createAction } from 'redux-actions';

export const FETCH_DATA = 'FETCH_DATA';
export const PERSIST_REHYDRATED = 'PERSIST_REHYDRATED';
export const LOGIN = 'USER/LOGIN';
export const LOGIN_SUCCESS = 'USER/LOGIN_SUCCESS';
export const SET_REMEMBERED_USER = 'USER/SET_REMEMBERED_USER';
export const AUTH_TOKEN = 'USER/AUTH_TOKEN';
export const AUTH_TOKEN_SUCCESS = 'USER/AUTH_TOKEN_SUCCESS';
export const LOGOUT = 'USER/LOGOUT';
export const INIT = 'INIT';
export const LOAD_USER = 'USER/LOAD';
export const SAVE_USER = 'USER/SAVE';
export const SIGNUP_USER = 'USER/SIGNUP';
export const VERIFY = 'USER/VERIFY'
export const actionCreators = {
    init: createAction(INIT),
    fetch: createAction(FETCH_DATA),
    login: createAction(LOGIN),
    loadUser: createAction(LOAD_USER),
    authToken: createAction(AUTH_TOKEN),
    authTokenSuccess: createAction(AUTH_TOKEN_SUCCESS),
    logout: createAction(LOGOUT),
    updateUser: createAction(SAVE_USER),
    signup: createAction(SIGNUP_USER),
    verifyUser: createAction(VERIFY)

};

export const userSave = user => ({
    type: LOGIN_SUCCESS,
    user
});
