import "./TopBar.css";
import {Link} from "react-router-dom";
import { HOME, LOGIN, REGISTER, SETTINGS, WRITE} from "../../config/routes/Paths";
import {Context} from "../../context/Context";
import {useContext} from "react";
import {UNKNOWN_USER, IG_CCM, ACCE} from "../../assets/Assets";
import axios from "axios";

export default function TopBar() {

    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/images/";

    const handleLogout = () =>{
        dispatch({type:"LOGOUT"});
        console.log(user.profilePic);
    };

    return (
        <div className="top">
            <div className="topLeft">
                <a href={IG_CCM}
                   target="_blank">
                    <i className="topIcon fa-brands fa-instagram"/>
                </a>
                <a href={ACCE}
                   target="_blank">
                    <i className="topIcon fa-solid fa-hashtag"/>
                </a>

            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem tpl">
                        <Link to={HOME} className="link">INICIO</Link>
                    </li>{/*
                    <li className="topListItem tpl">
                        <Link to={SETTINGS} className="link">ABOUT US</Link>
                    </li>
                    <li className="topListItem tpl">
                        <Link to='/contact' className="link">CONTACT</Link>
                    </li>*/}
                    {user ? (
                        <li className="topListItem tpl">
                            <Link to={WRITE}  className="link">NUEVA CERVEZA</Link>
                        </li>
                    ):null}

                    {user ? (
                        <li className="topListItem tpl" onClick={handleLogout}>
                            {user && "LOGOUT"}
                        </li>
                    ):null}

                </ul>

            </div>
            <div className="topRight">
                {user ? (
                    <Link to={SETTINGS}>
                        <img
                            className="topImg"
                            src={user.profilePic?user.profilePic:UNKNOWN_USER}
                            alt=""
                        />
                    </Link>
                    ) : (
                        <ul className="topList">
                            <li className="topListItem tpl">
                                <Link to={REGISTER} className="link">Register</Link>
                            </li>
                            <li className="topListItem tpl">
                                <Link to={LOGIN} className="link">Login</Link>
                            </li>
                        </ul>
                    )
                }

                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    );
}
