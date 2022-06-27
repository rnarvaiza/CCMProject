import React, {useContext, useRef, useState} from 'react';
import "./login.css"
import {REGISTER} from "../../config/routes/Paths";
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";
import axios from "axios";

function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const {dispatch, isFetching }= useContext(Context);
    const[error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsgDisplay, setErrorMsgDisplay] = useState("");


    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL
    });
    const handleSubmit = async (e) =>{
        setError(false);
        dispatch({type:"LOGIN_START"});
        try{
            e.preventDefault();
            const res = await axiosInstance.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({type:"LOGIN_SUCCESS", payload:res.data});
        }catch (err){
            console.log(err);
            dispatch({type:"LOGIN_FAILURE"});
            setError(true);
            setErrorMsg(err);
            console.log("va let error")
            let temp = errorMsg.code;
            console.log(temp);
            let temp2;
            switch (temp){
                case 'ERR_NETWORK':
                    temp2 = "No se ha podido conectar al servidor";
                    console.log(temp2);
                    break;
                case 'ERR_BAD_REQUEST':
                    temp2 = "error de conexión";
                    console.log(temp2);
                    break;
                case 'ERR_BAD_RESPONSE':
                    temp2 = "usuario o contraseña incorrectos";
                    console.log(temp2);
                    break;
                default:
                    temp2 = "usuario o contraseña incorrectos";
                    console.log(temp2);
            }
            setErrorMsgDisplay(temp2)

            console.log(errorMsgDisplay);
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form
                className="loginForm"
                onSubmit={handleSubmit}
            >
                <label>Username</label>
                <input
                    className="loginInput"
                    type="text"
                    placeholder="username"
                    ref={userRef}
                    required
                />
                <label>Password</label>
                <input
                    className="loginInput"
                    type="password"
                    placeholder="password"
                    ref={passwordRef}
                    required
                />
                <button className="loginButton buttonForm aa" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton buttonForm b">
                <Link to={REGISTER}  className="link">Register</Link>
            </button>
            <div className="labelContainer">
                {error?<label
                    className="errorLabel">
                    {errorMsgDisplay}
                </label>:null}
            </div>
        </div>
    );
}

export default Login;