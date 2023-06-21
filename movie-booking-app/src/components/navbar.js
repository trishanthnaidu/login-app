import React from "react";
import styled, { css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

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

const SignInContainer = styled.div`
    color: #eee;
`;

export const NavBar = function (props) {
    const loc = useLocation();
    const nav = useNavigate();
    const [name, setName] = React.useState("Guest");

    React.useEffect(() => {
        let data = sessionStorage.getItem("data");
        data = JSON.parse(data);

        if (data) {
            setName(data.userName);
        } else setName("Guest");
    }, [loc.pathname]);

    return (
        <NavBarContainer>
            <LogoContainer>
                <h6>MovieX</h6>
            </LogoContainer>
            <SignInContainer>Welcome {name}</SignInContainer>
        </NavBarContainer>
    );
};
