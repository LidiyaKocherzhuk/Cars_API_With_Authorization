import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';

import css from './Pages.module.css';
import {IAuth} from '../interfaces';
import {useAppDispatch} from '../hooks';
import {authActions} from '../redux';
import {useNavigate} from 'react-router-dom';

const RegisterPage = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registerUser: SubmitHandler<IAuth> = (userData) => {
      dispatch(authActions.register({user: userData}));
        navigate('/login');
    };

    return (
        <div className={css.Auth}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(registerUser)}>
                <input type='text' placeholder={'username'} {...register('username')}/>
                <input type='text' placeholder={'password'} {...register('password')}/>
                <button>Register</button>
            </form>
        </div>
    );
};

export {
    RegisterPage,
};