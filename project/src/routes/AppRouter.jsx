import React, {useEffect, useState} from 'react';
import {publicRoutes, userRoutes} from "./routes";
import {Route, Routes} from "react-router-dom";
import api from "../shared/service/axios/axiosClient";
import Loading from "../components/Loading";
import {useAuth} from "../shared/hooks/useAuth";

const AppRouter = () => {
    const {isLoading, isAuth} = useAuth()

    const getRouts = () => {
        if (!isAuth) {
            return publicRoutes
        } else {
            return userRoutes
        }
    }

    if(isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <Routes>
            {getRouts().map(route => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    )
};

export default AppRouter;