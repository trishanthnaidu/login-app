import React from "react";
import { useNavigate } from "react-router-dom";

export const PageNotFound = function () {
    const nav = useNavigate();
    return (
        <div>
            <h1>Page Not Found</h1>
            <button
                onClick={() => {
                    nav("/login");
                }}
            >
                Go to Login
            </button>
        </div>
    );
};
