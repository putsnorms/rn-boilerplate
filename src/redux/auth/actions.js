import {
    SET_USER,
    SET_TOKEN
} from './types';

export const setUser = (params) => ({
    type: SET_USER,
    payload: params
})

export const setToken = (params) => ({
    type: SET_TOKEN,
    payload: params
})