import React from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Outlet,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

// always make sure you export the component as default for using in React.Lazy
const HomePage = React.lazy(() => import("./home"));
const ContactPage = React.lazy(() => import("./contactus"));

function App() {
    const [comp, setComp] = React.useState("Before Load");

    // This example is used for dynamic import
    // const onBtnClick = async function () {
    //     const resp = await import("./home");

    //     setComp(resp.NewComponent);
    // };

    // This example is used for React Lazy
    // const onBtnClick = function () {
    //     setComp(
    //         <React.Suspense>
    //             <HomePage />
    //         </React.Suspense>
    //     );
    // };

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/:env" element={<WrapperComponent />} />
                </Routes>
            </Router>
        </div>
    );
}

const WrapperComponent = function () {debugger;
    const loc = useLocation();
    switch (loc.pathname) {
        case "/": {
            return <SuspenceWrap component={<div>This is Default Page</div>} />;
        }
        case "/Home": {
            return <SuspenceWrap component={<HomePage />} />;
        }
        case "/contact": {
            return <SuspenceWrap component={<ContactPage />} />;
        }
    }
};

const SuspenceWrap = function (props) {
    return <React.Suspense>{props.component}</React.Suspense>;
};

export default App;
