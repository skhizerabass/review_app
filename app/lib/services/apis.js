
import {
    apiCall,
} from './apiInstance';

function apiLogin(email, password) {
    return apiCall('signin', 'post', {
        data: {
            email,
            password,
        },
    });
};

function apiSignup(data) {
    return apiCall('signup', 'post', {
        data
    });
};

function apiUserRestaurantDetail(ID) {
    return apiCall('user/restaurant', 'get', {
        params: {
            ID,
        },
    });
};

function apiUserRestaurantReviews(ID) {
    return apiCall('user/restaurant/reviews', 'get', {
        params: {
            ID,
        },
    });
};

function apiUserRestaurants() {
    return apiCall('user/restaurants', 'get', {
    });
};

function apiUserCreateReview(data) {
    return apiCall('user/restaurant/review', 'post', {
        data
    });
};


function apiRemoveReview(ID) {
    return apiCall('user/restaurant/remove/review', 'post', {
        data: {
            ID
        }
    });
};

function apiUpdateUser(name) {
    return apiCall('user/settings', 'post', {
        data: {
            name
        }
    });
};

function apiInitDashboard() {
    return apiCall('owner', 'get', {
    });
}

function apiCreateRestaurant(data) {
    return apiCall('/', 'post', {
        data
    });
}

function apiUpdateRestaurant(data) {
    return apiCall('/update', 'post', {
        data
    });
}

function apiSaveReply(data) {
    return apiCall('/reply', 'post', {
        data
    });
}

function apiGetAllUers() {
    return apiCall('admin/getUsers', 'get', {

    });
}


function apiGetAllRestaurants() {
    return apiCall('admin/getRestaurants', 'get', {

    });
}

function removeUser(data) {
    return apiCall('admin/user/remove', 'post', {
        data
    });
}

function removeRestaurant(data) {
    return apiCall('admin/restaurant/remove', 'post', {
        data
    });
}

function verifyUser() {
    return apiCall('user/verify', 'get', {

    });
}

export {
    apiLogin,
    apiUserRestaurantDetail,
    apiUserRestaurants,
    apiUserRestaurantReviews,
    apiUserCreateReview,
    apiRemoveReview,
    apiUpdateUser,
    apiInitDashboard,
    apiCreateRestaurant,
    apiUpdateRestaurant,
    apiSaveReply,
    apiGetAllUers,
    apiGetAllRestaurants,
    removeUser,
    apiSignup,
    verifyUser,
    removeRestaurant
};
