import {createAsyncThunk, createSlice, isFulfilled, isRejected} from '@reduxjs/toolkit';

import {ICar, ICarData, IPagination, IParams, IPrevNext, IUpdateCarData} from '../../interfaces';
import {carsService} from '../../services';
import {urls} from '../../constants';

interface IState {
    cars: ICar[];
    updateCar: ICar;
    prevPage: IPrevNext;
    nextPage: IPrevNext;
    error: string;
}

const initialState: IState = {
    cars: [],
    updateCar: null,
    prevPage: null,
    nextPage: null,
    error: null,
}

const getAll = createAsyncThunk<IPagination, IParams>(
    'carSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await carsService.getAll({page});
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
            let res: ICar;

            if (updateData.photo) {
                const {data} = await carsService.updatePhoto(carId, updateData.photo);
                res = {...data, photo: urls.image(data.photo)}
            } else {
                const {data} = await carsService.update(carId, updateData);
                res = data;
            }

            return {car: res};
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
                state.cars = action.payload.items.sort((a, b) => b.id - a.id);
                state.prevPage = action.payload.prev;
                state.nextPage = action.payload.next;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.cars.unshift(action.payload.car);
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
            .addMatcher(isFulfilled(getAll, create, deleteCar, update), state => {
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