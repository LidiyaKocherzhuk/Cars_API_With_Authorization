import {createBrowserRouter, Navigate} from "react-router-dom";
import React from "react";

import { MainLayout } from "./layouts";
import {CarsPage, LoginPage, RegisterPage} from "./pages";
import {Cars} from "./components";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'cars'}/>},
            {path: 'cars', element: <CarsPage/>},
            {path: 'register', element: <RegisterPage/>},
            {path: 'login', element: <LoginPage/>},

        ]
    }
]);

export {router};