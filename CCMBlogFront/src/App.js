import TopBar from "./components/topbar/TopBar";
import Home from "./pages/homepage/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
    Route, Routes, BrowserRouter,
} from "react-router-dom";
import {HOME, LOGIN, WRITE, REGISTER, SETTINGS, POST_ID} from "./config/routes/Paths";
import {useContext} from "react";
import {Context} from "./context/Context";

function App() {

    const {user} = useContext(Context);

    return (
        <BrowserRouter>
            <TopBar/>
            <Routes>
                <Route path={HOME} element={<Home />} />
                <Route path={LOGIN} element={user ? <Home /> : <Login />} />
                <Route path={WRITE} element={user ? <Write /> : <Register />} />
                <Route path={REGISTER} element={user ? <Home /> : <Register />} />
                <Route path={SETTINGS} element={user ? <Settings /> : <Register />} />
                <Route path={POST_ID} element={<Single />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
