import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const NavBarContainer = styled.div`
    height: 40px;
    display: flex;
    padding: 0 24px;
    background: #1d1724;
    align-items: center;
    justify-content: space-between;
`;

const LogoContainer = styled.div`
    color: #e91e94;
    font-size: 24px;
`;

const SignInContainer = styled.div``;

const Button = styled.button`
    color: #fff;
    border: none;
    outline: none;
    margin: 2px 8px;
    padding: 4px 6px;
    border-radius: 4px;
    background: #4331ed;

    ${(props) =>
        props.outline &&
        css`
            color: #4331ed;
            background: #fff;
            border: solid 1px #4331ed;
        `}
`;

const AdminLabel = styled.span`
    color: #888;
`;

export const NavBar = function (props) {
    const loc = useLocation();
    const nav = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        setIsLoggedIn(sessionStorage.getItem("userName") || false);
    }, [loc.pathname]);

    return (
        <NavBarContainer>
            <LogoContainer>
                <h6>splash.io</h6>
            </LogoContainer>
            <AdminLabel>
                {sessionStorage.getItem("isAdmin") === "true"
                    ? `${isLoggedIn} - (Admin)`
                    : `${isLoggedIn} - (User)`}
            </AdminLabel>
            <SignInContainer>
                {!isLoggedIn ? (
                    loc.pathname === "/login" ? (
                        <Button
                            outline
                            onClick={() => {
                                nav("/signup");
                            }}
                        >
                            Register
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                nav("/login");
                            }}
                        >
                            Login
                        </Button>
                    )
                ) : (
                    <Button
                        onClick={() => {
                            sessionStorage.clear();
                            nav("/login");
                        }}
                    >
                        Sign Out
                    </Button>
                )}
            </SignInContainer>
        </NavBarContainer>
    );
};
