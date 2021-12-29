import { all } from 'redux-saga/effects';
import admin from './admin';
import owner from './owner';
import restaurants from './restaurants';
import user from './user';

const root = function* root() {
    yield all([
        user(),
        restaurants(),
        owner(),
        admin()
    ]);
};

export default root;
