import React from 'react';
import {NavLink} from "react-router-dom";

import css from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authService} from "../../services";
import {authActions} from "../../redux";

const Header = () => {
    const {me} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    if (authService.getAccessToken() && !me) {
        dispatch(authActions.getMe());
    }

    return (
        <div className={css.Header}>
            {me ?
                <div className={css.auth}>{me.username}</div>
                :
                <div className={css.auth}>
                    <NavLink to={'/login'}>Login</NavLink>
                    <NavLink to={'/register'}>Register</NavLink>
                </div>
            }
        </div>
    );
};

export {Header};