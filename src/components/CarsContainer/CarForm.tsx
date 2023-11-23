import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import css from './Cars.module.css';
import {ICarData} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {carActions} from '../../redux';

const CarForm = () => {
    const {
        handleSubmit,
        register,
        setValue,
        reset,
    } = useForm();

    const {updateCar} = useAppSelector(state => state.carReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (updateCar) {
            window.scrollTo(0, 0);
            setValue('brand', updateCar.brand);
            setValue('year', updateCar.year);
            setValue('price', updateCar.price);
        }
    }, [updateCar, setValue]);

    const create: SubmitHandler<ICarData> = (carData) => {
        dispatch(carActions.create(carData));
    }

    const update: SubmitHandler<ICarData> = (carData) => {
        dispatch(carActions.update({carId: updateCar.id, updateData: carData}));
        reset();
    }

    return (
        <div className={css.CarFormComponent}>
            <h2>{updateCar ? 'Update' : 'Create'} Car</h2>
            <form onSubmit={handleSubmit(updateCar ? update : create)} className={css.CarForm}>
                <input type='text' placeholder={'brand'} {...register('brand')}/>
                <input type='text' placeholder={'year'} {...register('year')}/>
                <input type='text' placeholder={'price'} {...register('price')}/>
                <button>{updateCar ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export {CarForm};