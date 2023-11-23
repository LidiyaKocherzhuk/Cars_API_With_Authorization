import {createAsyncThunk, createSlice, isFulfilled, isRejected} from '@reduxjs/toolkit';

import {IAuth, IUser} from '../../interfaces';
import {authService} from '../../services';

interface IState {
    me: IUser | null;
    error: string | null;
}

const initialState: IState = {
    me: null,
    error: null,
}

const register = createAsyncThunk<IUser, { user: IAuth }>(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            await authService.register(user);
        } catch (error: any) {
            return rejectWithValue(error.response);
        }
    }
);

const login = createAsyncThunk<IUser, { user: IAuth }>(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            return authService.login(user);
        } catch (error: any) {
            return rejectWithValue(error.response);
        }
    }
);

const getMe = createAsyncThunk<IUser, void>(
    'authSlice/getMe',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.me();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response);
        }
    }
);

const AuthSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        deleteMe: state => {
            state.me = null;
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(isFulfilled(login, getMe), (state, action) => {
                state.me = action.payload;
                state.error = null;
            })
            .addMatcher(isFulfilled(register), (state, action) => {
                state.error = null;
            })
            .addMatcher(isRejected(login, getMe, register), (state, action) => {
                state.error = action.payload as string;
            })

    }
})

const {reducer: authReducer, actions} = AuthSlice;
const authActions = {...actions, register, login, getMe};
export {
    authReducer,
    authActions,
}