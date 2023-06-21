import React from "react";
import { useLocation } from "react-router-dom";
import { MoviePage } from "../movie";

export const UserHome = function () {
    const { state } = useLocation();
    return <MoviePage {...state} />;
};
