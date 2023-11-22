import React, {useEffect} from 'react';

import css from './Cars.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {CarForm} from "./CarForm";
import {carActions} from "../../redux";
import {Car} from "./Car";

const Cars = () => {
    const {cars, page, error} = useAppSelector(state => state.carReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(carActions.getAll());
    }, []);

    return (
        <div className={css.CarsComponent}>
            <CarForm/>
            <hr/>
            <h2>Cars:</h2>
            <div className={css.Cars}>
                {cars.map(car => <Car key={car.id} car={car}/>)}
            </div>
        </div>
    );
};

export {Cars};