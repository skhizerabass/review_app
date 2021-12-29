import { createAction } from 'redux-actions';

export const GET_USERS = 'ADMIN/USERS';
export const GET_RESTAURANTS = 'ADMIN/RESTAURANTSS';
export const REMOVE_USER = 'ADMIN/REMOVE_USER';
export const REMOVE_RESTAURANT = 'ADMIN/REMOVE_RESTAURANT';

export const actionCreators = {
    getAllUsers: createAction(GET_USERS),
    getAllRestaurants: createAction(GET_RESTAURANTS),
    removeUser: createAction(REMOVE_USER),
    removeRestaurant: createAction(REMOVE_RESTAURANT)

};
