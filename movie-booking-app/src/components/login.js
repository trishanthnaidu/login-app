import React from "react";
import axios from "axios";
import {
    InputText,
    HeaderText,
    LoginButton,
    ContentWrapper,
    LogInContainer,
} from "./commons";
import { useNavigate } from "react-router-dom";
import { APIS } from "../service/apis";

export const LogIn = function () {
    const nav = useNavigate();
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const submitRef = React.useRef();
    const authenticateUser = async function () {
        const userName = usernameRef.current.value;
        const password = passwordRef.current.value;

        const { data } = await APIS("/authenticate", "post", {
            userName,
            password,
        });

        if (data.data.isAuth && data.success.successCode === 200) {
            sessionStorage.setItem("data", JSON.stringify(data.data));

            if (data.data.isAdmin) {
                nav("/admin-home", {
                    state: {
                        isAdmin: data.data.isAdmin,
                        userName: data.data.userName,
                    },
                });
            } else
                nav("/user-home", {
                    state: {
                        isAdmin: data.data.isAdmin,
                        userName: data.data.userName,
                    },
                });
        }
    };
    const onEnter = function (evt) {
        // if the key pressed is an Enter key then
        if (evt.keyCode === 13) {
            submitRef.current.click();
        }
    };
    let data = sessionStorage.getItem("data");
    data = JSON.parse(data);

    React.useEffect(function () {
        if (data?.hasOwnProperty("isAdmin")) {
            debugger;
            data?.isAdmin
                ? nav("/admin-home", {
                      state: {
                          isAdmin: data.isAdmin,
                          userName: data.userName,
                      },
                  })
                : nav("/user-home", {
                      state: {
                          isAdmin: data.isAdmin,
                          userName: data.userName,
                      },
                  });
        }
    }, []);

    return (
        <LogInContainer>
            <ContentWrapper>
                <HeaderText>Login</HeaderText>
                <InputText
                    ref={usernameRef}
                    type="text"
                    placeholder="username"
                    defaultValue={data?.userName || ""}
                    autoFocus={data?.userName ? false : true}
                />
                <InputText
                    ref={passwordRef}
                    type="password"
                    placeholder="password"
                    autoFocus={data?.userName ? true : false}
                    onKeyUp={onEnter}
                />

                <LoginButton ref={submitRef} onClick={authenticateUser}>
                    Sign In
                </LoginButton>
            </ContentWrapper>
        </LogInContainer>
    );
};
