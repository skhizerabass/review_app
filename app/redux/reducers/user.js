import {
    LOGIN_SUCCESS,
    AUTH_TOKEN_SUCCESS,
    LOGOUT,
    INIT
} from '../actions/user';


const initialState = {
    user: null,
    loading: true
}


export default User = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            const { user } = action;
            return {
                ...state,
                user,
                loading: false
            };
        }
        case INIT: {
            return {
                ...state,
                loading: true
            }
        }
        case AUTH_TOKEN_SUCCESS: {
            const { user } = action;
            return {
                ...state,
                user,
            };
        }
        case LOGOUT: {
            return {
                ...state,
                user: null,
                loading: false
            }
        }

        default: {
            return state;
        }
    }
}