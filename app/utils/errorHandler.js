import { Alert } from 'react-native';

export function* onError(error) {
    let message = 'Something went wrong.';

    try {
        const responseData = error.message;
        if (typeof responseData === 'string') {
            message = responseData;
        }

    } catch (err) {
        //
    }

    Alert.alert('Warning', message);
};
