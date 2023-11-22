import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {IAuth} from "../interfaces";
import {useAppDispatch, useAppSelector} from "../hooks";
import {authActions} from "../redux";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const {me, error} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm();

    const login:SubmitHandler<IAuth> = async (user) => {
        const {meta:{requestStatus}} = await dispatch(authActions.login({user}));
        if (requestStatus === 'fulfilled'){
            navigate('/cars')
        }
    };

    console.log(me, error);

    return (
        <form onSubmit={handleSubmit(login)}>
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>Login</button>
        </form>
    );
};

export {LoginPage};