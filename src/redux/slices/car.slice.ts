import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";

import {ICar, ICarData, IPagination, IUpdateCarData} from "../../interfaces";
import {carsService} from "../../services/cars.service";

interface IState {
    cars: ICar[];
    updateCar: ICar;
    page: any;
    error: string;
}

const initialState: IState = {
    cars: [],
    updateCar: null,
    page: {},
    error: null,
}

const getAll = createAsyncThunk<IPagination, void>(
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carsService.getAll();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const create = createAsyncThunk<{ car: ICar }, ICarData>(
    'carSlice/create',
    async (carData, {rejectWithValue}) => {
        try {
            const {data} = await carsService.create(carData);
            return {car: data};
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const update = createAsyncThunk<{ car: ICar }, { carId: number, updateData: IUpdateCarData }>(
    'carSlice/update',
    async ({carId, updateData}, {rejectWithValue}) => {
        try {
            const {data} = await carsService.update(carId, updateData);
            return {car: data};
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const deleteCar = createAsyncThunk<{ carId: number }, { carId: number }>(
    'carSlice/deleteCar',
    async ({carId}, {rejectWithValue}) => {
        try {
            await carsService.delete(carId);
            return {carId};
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const CarSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setUpdateCar: (state, action) => {
            state.updateCar = action.payload.car;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload.items;
                state.page = action.payload;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.cars.push(action.payload.car);
            })
            .addCase(update.fulfilled, (state, action) => {
                state.cars = state.cars.map(car => {
                    if (car.id === action.payload.car.id) {
                        return action.payload.car;
                    }
                    return car;
                });
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.cars = state.cars.filter(car => car.id !== action.payload.carId);
            })
            .addMatcher(isFulfilled(getAll, create, deleteCar, update), (state, action) => {
                state.error = null;
            })
            .addMatcher(isRejected(getAll, create, deleteCar, update), (state, action) => {
                state.error = action.payload as string;
            })
    }
});

const {reducer: carReducer, actions} = CarSlice;
const carActions = {...actions, getAll, create, update, deleteCar};

export {
    carReducer,
    carActions,
}