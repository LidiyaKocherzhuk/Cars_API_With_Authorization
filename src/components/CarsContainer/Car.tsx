import React, {FC, PropsWithChildren, useRef} from 'react';

import css from './Cars.module.css';
import {ICar} from '../../interfaces';
import empty from '../../assets/images/empty.jpg';
import {useAppDispatch} from '../../hooks';
import {carActions} from '../../redux';

interface IProps extends PropsWithChildren {
    car: ICar,
}

const Car: FC<IProps> = ({car}) => {
    const {id, brand, year, price, photo} = car;

    const dispatch = useAppDispatch();
    const fileElement = useRef<HTMLInputElement>();

    const addPhoto = async () => {
        const formData = new FormData();
        const file: Blob = fileElement.current.files[0];

        formData.append('photo', file);
        dispatch(carActions.update({carId: id, updateData: {photo: formData}}));
    };

    return (
        <div className={css.Car}>
            <hr/>
            <div> id: {id}</div>
            <div> brand: {brand}</div>
            <div> year: {year}</div>
            <div> price: {price}</div>

            <img src={photo || empty} alt={brand} onClick={() => fileElement.current.click()}/>
            <input type='file' accept={'image/jpeg, image/png'} name={'photo'} ref={fileElement} onChange={addPhoto}/>

            <div className={css.btns}>
                <button onClick={() => dispatch(carActions.setUpdateCar({car}))}>update</button>
                <button onClick={() => dispatch(carActions.deleteCar({carId: id}))}>delete</button>
            </div>
        </div>
    );
};

export {Car};