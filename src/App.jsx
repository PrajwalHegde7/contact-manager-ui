import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
// import Alerts from './components/layout/Alerts';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
// import AlertState from './context/alert/AlertState';
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import NotFound from "./components/pages/NotFound";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <AuthState>
            <ContactState>
                {/* <AlertState> */}
                <Router>
                    <Navbar />
                    <div className="container">
                        {/* <Alerts /> */}
                        <ToastContainer
                            position={toast.POSITION.BOTTOM_RIGHT}
                            autoClose={2000}
                            limit={5}
                            newestOnTop={true}
                            pauseOnFocusLoss={false}
                        />
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={
                                    <PrivateRoute>
                                        <Home />
                                    </PrivateRoute>
                                }
                            />
                            <Route exact path="/about" element={<About />} />
                            <Route
                                exact
                                path="/register"
                                element={<Register />}
                            />
                            <Route exact path="/login" element={<Login />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </Router>
                {/* </AlertState> */}
            </ContactState>
        </AuthState>
    );
};

export default App;
