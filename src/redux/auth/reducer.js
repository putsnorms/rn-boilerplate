import {
    SET_USER,
    SET_TOKEN,
} from './types';

let initialState = {
    user: null,
    token: null
}

export const reducer = (state = initialState, {type , payload}) => {
    switch(type) {
        case SET_USER:
            return {
                ...state,
                user: payload
            }
            break;
        case SET_TOKEN:
            return {
                ...state,
                token: payload
            }
            break;
        default:
            return state;
            break;
    }
}