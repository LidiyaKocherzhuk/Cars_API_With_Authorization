import {configureStore} from '@reduxjs/toolkit';

import {authReducer, carReducer} from './slices';

const store = configureStore({
    reducer: {
        authReducer,
        carReducer,
    }
});

type RootStore = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type {
    RootStore,
    AppDispatch,
}

export {
    store
};