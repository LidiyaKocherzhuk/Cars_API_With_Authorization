import React from 'react';
import {Outlet} from "react-router-dom";

import css from './Layout.module.css';
import {Header} from "../components";

const MainLayout= () => {
    return (
        <div className={css.Layout}>

            <Header/>
            <Outlet/>

        </div>
    );
};

export {MainLayout};