import { createStore } from 'redux';
import rootReducer from './reducers';

export default function configureStore() {
    store = createStore(
        rootReducer
    );

    return store;
}

