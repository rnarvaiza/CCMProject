import React, {useContext, useEffect, useState} from 'react';
import "./singlePost.css"
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {Context} from "../../context/Context";
import {HOME} from "../../config/routes/Paths";

function SinglePost(props) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [originalGravity, setOriginalGravity] = useState("");
    const [finalGravity, setFinalGravity] = useState("");
    const [mashTemp, setMashTemp] = useState("");
    const [mashTime, setMashTime] = useState("");
    const [boilTime, setBoilTime] = useState("");
    const [malts, setMalts] = useState("");
    const [hops, setHops] = useState("");
    const [dealLink, setDealLink] = useState("");
    const [otherAggregates, setOtherAggregates] = useState("");
    const [waterProfile, setWaterProfile] = useState("");
    const [style, setStyle] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL
    });

    useEffect(()=>{
        const getPost = async () =>{
            const res = await axiosInstance.get("/posts/"+path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setOriginalGravity(res.data.originalGravity);
            setFinalGravity(res.data.finalGravity);
            setMashTemp(res.data.mashTemp);
            setMashTime(res.data.mashTime);
            setBoilTime(res.data.boilTime);
            setMalts(res.data.malts);
            setHops(res.data.hops);
            setOtherAggregates(res.data.otherAggregates);
            setWaterProfile(res.data.waterProfile);
            setStyle(res.data.categories);
            setDealLink(res.data.dealLink);
        };
        getPost();
    },[path]);

    const handleDelete = async() =>{
        try{
            await axiosInstance.delete(`/posts/${post._id}`, {
                data:{username:user.username},
            });
            window.location.replace(HOME);
        }catch (err){}
    }

    const handleUpdate = async () =>{
        try{
            await axiosInstance.put(`/posts/${post._id}`, {
                username:user.username,
                title,
                desc,
                originalGravity,
                finalGravity,
                mashTemp,
                mashTime,
                boilTime,
                malts,
                hops,
                otherAggregates,
                waterProfile,
                style,
            });
        setUpdateMode(false)
        }catch (err){}
    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.beerPhoto &&
                <img
                    src={post.beerPhoto}
                    alt=""
                    className="singlePostImg"
                />
                }
                {updateMode ? (
                <input type="text"
                       value={title}
                       className="singlePostTittleInput"
                       onChange={(e)=>setTitle(e.target.value)}
                       autoFocus
                />
                ) :(
                <h1 className="singlePostTittle">
                    {title}
                    {post.username === user?.username && (
                    <div className="singlePostEdit">
                        <i
                            className="singlePostIcon fa-solid fa-pen-to-square"
                            onClick={()=>setUpdateMode(true)}
                        />
                        <i className="singlePostIcon fa-solid fa-trash-can"
                           onClick={handleDelete}
                        />
                    </div>
                    )}
                </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b> {post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        {new Date(post.createdAt).toLocaleDateString('es-ES', options)}
                    </span>
                </div>
                <div className="postDescrip">
                    {updateMode ? (
                        <textarea className="singlePostDescInput"
                                  value={desc}
                                  onChange={(e)=>setDesc(e.target.value)}
                        />
                    ) : (
                        <textarea className="singlePostDesc fixedInput"
                                  value={desc}
                                  disabled="true"
                        />
                    )}
                    {updateMode ? (
                        <></>
                    ) : (
                        <p className="singlePostDescLegend">
                            Descripcion
                        </p>
                    )}
                </div>
                <div className="singlePostItemsB">
                    <div className="ogFather">
                        {updateMode ? (
                            <input className="ogInput"
                                   value={originalGravity}
                                   onChange={(e)=>setOriginalGravity(e.target.value)}
                            />
                        ) : (
                            <p className="og">
                                {originalGravity}
                            </p>
                        )}
                        {updateMode ? (
                            <></>
                        ) : (
                            <p className="ogLegend">
                                original gravity
                            </p>
                        )}
                    </div>
                    <div className="fgFather">
                        {updateMode ? (
                            <input className="fgInput"
                                   value={finalGravity}
                                   onChange={(e)=>setFinalGravity(e.target.value)}
                            />
                        ) : (
                            <p className="fg">
                                {finalGravity}
                            </p>
                        )}
                        {updateMode ? (
                         <></>
                        ) : (
                            <p className="fgLegend">
                                final gravity
                            </p>
                        )}
                    </div>
                    <div className="mTempFather">
                        {updateMode ? (
                            <input className="mTempInput"
                                   value={mashTemp}
                                   onChange={(e)=>setMashTemp(e.target.value)}
                            />
                        ) : (
                            <p className="mTemp">
                                {mashTemp}
                            </p>
                        )}
                        {updateMode ? (
                            <></>
                        ) : (
                            <p className="mTempLegend">
                                mash temp
                            </p>
                        )}
                    </div>
                    <div className="mTimeFather">
                        {updateMode ? (
                            <input className="mTimeInput"
                                   value={mashTime}
                                   onChange={(e)=>setMashTime(e.target.value)}
                            />
                        ) : (
                            <p className="mTime">
                                {mashTime}
                            </p>
                        )}
                        {updateMode ? (
                        <></>
                            ) : (
                            <p className="mTimelegend">
                                mash time
                            </p>
                        )}
                    </div>
                    <div className="btFather">
                        {updateMode ? (
                            <input className="btInput"
                                   value={boilTime}
                                   onChange={(e)=>setBoilTime(e.target.value)}
                            />
                        ) : (
                            <p className="bt">
                                {boilTime}
                            </p>
                        )}
                        {updateMode ? (
                           <></>
                        ) : (
                            <p className="btLegend">
                                boil time
                            </p>
                        )}
                    </div>
                    <div className="styleFather">
                        {updateMode ? (
                            <input className="styleInputB"
                                   value={style}
                                   onChange={(e)=>setStyle(e.target.value)}
                            />
                        ) : (
                            <input
                                className="styles fixedInput"
                                disabled="true"
                                placeholder={style.toString()}
                            />

                        )}
                        {updateMode ? (
                        <></>
                            ) : (
                            <p className="stylesLegend">
                                style
                            </p>
                        )}
                    </div>
                </div>
                <div className="singlePostItemsC">
                    <div className="maltsFather">
                        {updateMode ? (
                            <textarea className="maltsInputE"
                                   value={malts}
                                   onChange={(e)=>setMalts(e.target.value)}
                            />
                        ) : (
                            <textarea className="malts fixedInput"
                                      value={malts}
                                      disabled="true"
                            />
                        )}
                        {updateMode ? (
                         <></>
                            ) : (
                            <p className="maltsLegend">
                                malts
                            </p>
                        )}
                    </div>
                    <div className="hopsFather">
                        {updateMode ? (
                            <textarea className="hopsInputE"
                                   value={hops}
                                   onChange={(e)=>setHops(e.target.value)}
                            />
                        ) : (
                            <textarea className="hops fixedInput"
                                      value={hops}
                                      disabled="true"
                            />
                        )}
                        {updateMode ? (
                            <></>
                        ) : (
                            <p className="hopsLegend">
                                hops
                            </p>
                        )}
                    </div>
                </div>
                <div className="singlePostItemsC">
                    <div className="otherAggregatesFather">
                        {updateMode ? (
                            <textarea className="otherAggregatesInputE"
                                      value={otherAggregates}
                                      onChange={(e)=>setOtherAggregates(e.target.value)}
                            />
                        ) : (
                            <textarea className="otherAggregates fixedInput"
                                      value={otherAggregates}
                                      disabled="true"
                            />
                        )}
                        {updateMode ? (
                            <></>
                        ) : (
                            <p className="otherAggregatesLegend">
                                other aggregates
                            </p>
                        )}
                    </div>
                    <div className="waterFather">
                        {updateMode ? (
                            <textarea className="waterInputE"
                                      value={waterProfile}
                                      onChange={(e)=>setWaterProfile(e.target.value)}
                            />
                        ) : (
                            <textarea className="water fixedInput"
                                      value={waterProfile}
                                      disabled="true"
                            />
                        )}
                        {updateMode ? (
                            <></>
                        ) : (
                            <p className="waterLegend">
                                water profile
                            </p>
                        )}
                    </div>
                </div>
                <div className="singlePostItemsD">
                    {dealLink &&(
                        <p className="dealLink">links de ofertas</p>
                    )}
                    {dealLink &&(
                        <p
                            className="dealLink"
                            value={dealLink}
                        />
                    )}
                </div>
            </div>
            <div className="updateButton">
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
}

export default SinglePost;