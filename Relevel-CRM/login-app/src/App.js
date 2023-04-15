import styled from "styled-components";
import { NavBar } from "./component/navbar";
import { Playground } from "./component/playground";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SignUp } from "./component/signup";
import { LogIn } from "./component/signin";
import { PageNotFound } from "./component/page-not-found";
import { AdminContainer, AdminPanel } from "./component/admin";
import { Home } from "./component/home";
import { HelloWorld } from "./component/admin/hello-world";
import { OneView } from "./component/admin/one-view";
import { SidePanel } from "./component/side-panel";

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: #120f17;
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
                        <Route
                            path="/admin"
                            element={
                                <AdminContainer childComponents={<Outlet />} />
                            }
                        >
                            <Route path="one-view" element={<OneView />} />
                            <Route
                                path="hello-world"
                                element={<HelloWorld />}
                            />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Playground>
            </BrowserRouter>
        </AppContainer>
    );
}

export default App;
