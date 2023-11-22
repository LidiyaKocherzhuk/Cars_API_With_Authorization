import React, {FC, PropsWithChildren} from 'react';

import css from './Cars.module.css';
import {ICar} from "../../interfaces";
import empty from '../../assets/images/empty.jpg';
import {useAppDispatch} from "../../hooks";
import {carActions} from "../../redux";

interface IProps extends PropsWithChildren {
    car: ICar,
}

const Car: FC<IProps> = ({car}) => {
    const {id, brand, year, price, photo} = car;

    const dispatch = useAppDispatch();

    return (
        <div className={css.Car}>
            <hr/>
            <div> id: {id}</div>
            <div> brand: {brand}</div>
            <div> year: {year}</div>
            <div> price: {price}</div>
            <img src={photo || empty} alt={brand}/>
            <div className={css.btns}>
                <button onClick={() => dispatch(carActions.setUpdateCar({car}))}>update</button>
                <button onClick={() => dispatch(carActions.deleteCar({carId: id}))}>delete</button>
            </div>
        </div>
    );
};

export {Car};