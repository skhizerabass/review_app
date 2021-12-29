import axios from 'axios';

import {
    API_BASE_URL,
} from 'app/constants/configs';

const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-version': '3.1',
    },
    timeout: 3000,
});

//Setting authentication token for logged In user

function setAuthToken(token, ID) {
    apiInstance.defaults.headers.authorization = `bearer ${token} ${ID}`;
};

//Removing authentication token for logged out user
function removeAuthToken() {
    delete apiInstance.defaults.headers.authorization;
}

async function apiCall(url, method, { data, params }) {
    // console.log(url, method, { data, params },apiInstance.);
    try {

        // return await axios(options);
        return await apiInstance.request({ url, method, data, params });
    } catch (error) {

        return Promise.reject(error.response ? error.response.data : error);
    }
};

export {
    setAuthToken,
    removeAuthToken,
    apiCall,
};
