import React, {useState} from 'react';
import "./register.css"
import {Link} from "react-router-dom";
import {LOGIN, REGISTER} from "../../config/routes/Paths";
import axios from "axios";

function Register() {

    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setpassword] = useState("");
    const[error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsgDisplay, setErrorMsgDisplay] = useState("");

    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL
    });

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError(false);
        try{
            const res = await axiosInstance.post("/auth/register", {
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login");
        }catch (err){
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
                    temp2 = "usuario o contraseña incorrectos";
                    console.log(temp2);
                    break;
                case 'ERR_BAD_RESPONSE':
                    temp2 = "error de conexión";
                    console.log(temp2);
                    break;
                default:
                    temp2 = "algo ha ocurrido ..." + temp;
                    console.log(temp2);
            }
            setErrorMsgDisplay(temp2)

            console.log(errorMsgDisplay);
        }
    };
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Usuario</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Usuario"
                    onChange={e=>setUsername(e.target.value)}
                    required
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="email"
                    onChange={e=>setEmail(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    className="registerInput"
                    type="password"
                    placeholder="password"
                    onChange={e=>setpassword(e.target.value)}
                    required
                />
                <button
                    className="registerButton buttonForm cc"
                    type="submit"
                >
                    register
                </button>
            </form>
            <button className="registerLoginButton buttonForm aa">
                <Link to={LOGIN} className="link">Login</Link>
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

export default Register;