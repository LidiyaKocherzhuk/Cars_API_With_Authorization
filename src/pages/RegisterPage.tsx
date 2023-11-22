import React from 'react';
import {useForm, SubmitHandler} from "react-hook-form";

import {IAuth} from "../interfaces";
import {authService} from "../services";

const RegisterPage = () => {
    const {register, handleSubmit} = useForm();

    const registerUser: SubmitHandler<IAuth> = (userData) => {
        // const data = await authService.register(userData);
        // console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>Register</button>
        </form>
    );
};

export {
    RegisterPage,
};