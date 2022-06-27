import "./sidebar.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {ACCE, BREWERS_LOGO, FORO_ACCE, IG_CCM} from "../../assets/Assets";

const Sidebar = () => {
    const [cats,setCats] = useState([]);

    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL
    });

    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axiosInstance.get("/categories");
            setCats(res.data);
        };
        getCats();
    },[]);
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">SOBRE NOSOTROS</span>
                <img className="sidebarImg"
                     src={BREWERS_LOGO}
                />
                <p className="sidebarText">Somos un grupo de aficionados a elaborar nuestra propia cerveza en casa. Nos encanta experimentar, probar y teorizar sobre mezclas de mostos y lupulos</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">ESTILOS</span>
                <ul className="sidebarList">
                    {cats.map((c)=>(
                        <Link to ={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">SIGUENOS</span>
                <div className="sidebarSocial">
                    <a href={IG_CCM}
                       target="_blank">
                        <i className="topIcon fa-brands fa-instagram"/>
                    </a>
                    <a href={ACCE}
                       target="_blank">
                        <i className="topIcon fa-solid fa-hashtag"/>
                    </a>
                </div>
            </div>
            <div className="sidebarItem">
                <span
                    className="sidebarTitle"
                    title="Asociación de cerveceros caseros españoles">
                    ACCE
                </span>
                <a href={FORO_ACCE}
                   target="_blank">
                    <i className="topIcon fa-solid fa-swatchbook"></i>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;