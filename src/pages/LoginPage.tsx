import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import css from './Pages.module.css';
import {IAuth} from '../interfaces';
import {useAppDispatch} from '../hooks';
import {authActions} from '../redux';
import {authService} from '../services';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm();

    useEffect(() => {
        authService.deleteTokens();
        dispatch(authActions.deleteMe());
    }, [dispatch]);

    const login:SubmitHandler<IAuth> = async (user) => {
        const {meta:{requestStatus}} = await dispatch(authActions.login({user}));
        if (requestStatus === 'fulfilled'){
            navigate('/cars')
        }
    };

    return (
        <div className={css.Auth}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(login)}>
                <input type='text' placeholder={'username'} {...register('username')}/>
                <input type='text' placeholder={'password'} {...register('password')}/>
                <button>Login</button>
            </form>
        </div>
    );
};

export {LoginPage};