import { createAction } from 'redux-actions';

export const INIT = 'INIT';
export const actionCreators = {
    fetch: createAction(INIT),
};
