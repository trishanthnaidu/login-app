import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AgGrid } from "./ag-grid";
import { MuiGrid } from "./mui-grid";

const Container = styled.div`
    padding: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const GridContainer = styled.div`
    margin: 20px;
`;

const axiosConfig = {
    headers: {
        "Content-Type": "application/json",
    },
};
const baseURL = "http://localhost:9000/";
export const Home = function () {
    const nav = useNavigate();
    const [grid, setGrid] = React.useState(true);
    React.useEffect(() => {
        async function checkForLiveSession() {
            const userName = sessionStorage.getItem("userName");
            const resp = await axios.get(
                baseURL + "checkSession?usrn=" + userName
            );
            if (resp.data && resp.data.redirectUrl) {
                nav(resp.data.redirectUrl);
            }
        }

        checkForLiveSession();
    }, []);
    return (
        <Container>
            <button onClick={() => setGrid(!grid)}>Grid View Toggle</button>

            <GridContainer>{grid ? <AgGrid /> : <MuiGrid />}</GridContainer>
        </Container>
    );
};
