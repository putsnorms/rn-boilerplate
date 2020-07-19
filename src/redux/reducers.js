import { combineReducers } from 'redux';
import {reducer as AuthReducer} from './auth/reducer';

const appReducers = combineReducers({
    AuthReducer: AuthReducer
});

const rootReducer = (state, action) => {
    if(action.type === 'RESET_STATE') {
        state = 'undefined';
    }

    return appReducers(state, action);
}


export default rootReducer;