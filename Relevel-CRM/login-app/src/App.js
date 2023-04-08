import styled from "styled-components";
import { NavBar } from "./component/navbar";
import { Playground } from "./component/playground";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./component/signup";
import { LogIn } from "./component/signin";
import { PageNotFound } from "./component/page-not-found";
import { AdminPanel } from "./component/admin";
import { Home } from "./component/home";

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: #eff1f8;
`;

function App() {
    return (
        <AppContainer>
            <BrowserRouter>
                <NavBar />
                <Playground>
                    <Routes>
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Playground>
            </BrowserRouter>
        </AppContainer>
    );
}

export default App;
