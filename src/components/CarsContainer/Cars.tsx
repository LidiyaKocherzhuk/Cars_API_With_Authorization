import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import css from './Cars.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {CarForm} from './CarForm';
import {carActions} from '../../redux';
import {Car} from './Car';

const Cars = () => {
    const {cars, prevPage, nextPage} = useAppSelector(state => state.carReducer);
    const [searchParams, setSearchParams] = useSearchParams({page: '1'});
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(carActions.getAll({page: null}));
    }, [dispatch]);


    const prev = () => {
        if (prevPage && searchParams.get('page') !== '2') {
            setSearchParams({page: prevPage.page});
            dispatch(carActions.getAll(prevPage));
        } else {
            setSearchParams({page: '1'});
            dispatch(carActions.getAll({page: null}));
        }
        window.scrollTo(0, 0);
    }
    const next = () => {
        setSearchParams({page: nextPage.page});
        dispatch(carActions.getAll(nextPage));
        window.scrollTo(0, 0);
    }

    return (
        <div className={css.CarsComponent}>

            <CarForm/>
            <hr/>

            <h2>Cars:</h2>

            <div className={css.Cars}>
                {cars.map(car => <Car key={car.id} car={car}/>)}
            </div>

            <hr/>
            <div className={css.pagination}>
                <button disabled={!prevPage} onClick={prev}>prev</button>
                <button disabled={!nextPage} onClick={next}>next</button>
            </div>
        </div>
    );
};

export {Cars};