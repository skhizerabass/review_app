import { createAction } from 'redux-actions';

export const FETCH_USER_RESTAURANTS = 'USER/RESTAURANTS';
export const FETCH_USER_RESTAURANT_DETAIL = 'USER/RESTAURANT/DETAIL';
export const FETCH_RESTAURANT_REVIEWS = 'RESTAURANT/REVIEWS';
export const FETCH_USER_REVIEW = 'USER/REVIEW';
export const FETCH_REMOVE_REVIEW = 'USER/REVIEW/REMOVE';
export const DASHBOARD_INIT = 'DASHBOARD_INIT';
export const NEW_RESTAURANT = 'OWNER/RESTAURANT';
export const UPDATE_RESTAURANT = 'OWNER/UPDATE_RESTAURANT';
export const SAVE_REPLY = 'OWNER/SAVE_REPLY';

export const actionCreators = {
    fetchUserRestaurants: createAction(FETCH_USER_RESTAURANTS),
    fetchRestaurantDetail: createAction(FETCH_USER_RESTAURANT_DETAIL),
    fetchReviews: createAction(FETCH_RESTAURANT_REVIEWS),
    createReview: createAction(FETCH_USER_REVIEW),
    removeReview: createAction(FETCH_REMOVE_REVIEW),
    dashboardInit: createAction(DASHBOARD_INIT),
    createRestaurant: createAction(NEW_RESTAURANT),
    updateRestaurant: createAction(UPDATE_RESTAURANT),
    saveReply: createAction(SAVE_REPLY)


};
