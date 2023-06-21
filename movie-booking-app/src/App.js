import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "@peppyui/core";

import { LogIn } from "./components/login";
import { NavBar } from "./components/navbar";
import { Playground } from "./components/playground";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminHome } from "./components/admin/home";
import { UserHome } from "./components/user/home";
import { Screens } from "./components/screens";

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #120f17;
`;

function App() {
    return (
        <ThemeProvider theme="light">
            <AppContainer>
                <BrowserRouter>
                    <NavBar />
                    <Playground>
                        <Routes>
                            <Route exact path="/login" element={<LogIn />} />
                            <Route
                                exact
                                path="/admin-home"
                                element={<AdminHome isAdmin={true} />}
                            />
                            <Route
                                exact
                                path="/user-home"
                                element={<UserHome isAdmin={false} />}
                            />
                            <Route
                                exact
                                path="/admin-screen"
                                element={<Screens isAdmin={true} />}
                            />
                            <Route
                                exact
                                path="/user-screen"
                                element={<Screens isAdmin={false} />}
                            />
                        </Routes>
                    </Playground>
                </BrowserRouter>
            </AppContainer>
        </ThemeProvider>
    );
}

export default App;
