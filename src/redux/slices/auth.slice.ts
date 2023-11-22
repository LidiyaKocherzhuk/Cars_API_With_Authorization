import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";

import {IAuth, IUser} from "../../interfaces";
import {authService} from "../../services";

interface IState {
    me: IUser | null;
    error: string | null;
}

const initialState: IState = {
    me: null,
    error: null,
}

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
    reducers: {},
    extraReducers: builder => {
        builder
            // .addCase(login.fulfilled, (state, action) => {
            // })
            // .addCase(getMe.fulfilled, (state, action) => {
            //     state.user = action.payload;
            // })
            .addMatcher(isFulfilled(login, getMe), (state, action) => {
                state.me = action.payload;
                state.error = null;
            })
            .addMatcher(isRejected(login, getMe), (state, action) => {
                state.error = action.payload as string;
            })

    }
})

const {reducer: authReducer, actions, caseReducers} = AuthSlice;
const authActions = {...actions, login, getMe};
export {
    authReducer,
    authActions,
}