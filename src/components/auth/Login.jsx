import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
// import AlertContext from "../../context/alert/alertContext";
import { toast } from "react-toastify";

const Login = (props) => {
    // const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    // const { setAlert, removeAlerts } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;

    // useEffect(()=>{
    //     removeAlerts();
    //     // eslint-disable-next-line
    // },[user])

    useEffect(() => {
        if (isAuthenticated) {
            toast.success("Login success");
            navigate("/");
        }

        if (error) {
            //Invalid Credentials
            toast.error(error);
            // setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated]);

    const onChange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        // removeAlerts();
        if (email === "" || password === "") {
            toast.error("Please fill in all fields", "danger");
            // setAlert("Please fill in all fields", "danger");
        } else {
            login({
                email,
                password,
            });
        }
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={email}
                        onChange={onChange}
                        placeholder="e.g. john@doe.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
autoComplete="current-password"
                        value={password}
                        onChange={onChange}
                        placeholder="*******"
                    />
                </div>
                <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary btn-block"
                />
            </form>
            <br />
            <p>
                Do not have an account? Please{" "}
                <Link to="/register">register here</Link>.
            </p>
        </div>
    );
};

export default Login;
