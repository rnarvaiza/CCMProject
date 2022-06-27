import { useContext, useState, useEffect } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import {HOME} from "../../config/routes/Paths";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import firebaseApp from "../../firebase";
import {Link, useLocation} from "react-router-dom";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [originalGravity, setOriginalGravity] = useState("");
    const [finalGravity, setFinalGravity] = useState("");
    const [mashTemp, setMashTemp] = useState("");
    const [mashTime, setMashTime] = useState("");
    const [boilTime, setBoilTime] = useState("");
    const [malts, setMalts] = useState("");
    const [hops, setHops] = useState("");
    const [beerPhoto, setBeerPhoto] = useState("");
    const [otherAggregates, setOtherAggregates] = useState("");
    const [waterProfile, setWaterProfile] = useState("");
    const [style, setStyle] = useState("");
    const { user } = useContext(Context);

    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL
    });
    const storage = getStorage(firebaseApp);
    let beerPicUrl;

    const handleUpload = async (e) =>{
        try{
            if (file) {
                const upload = ref(storage, `/items/${file.name}`);
                console.log(upload);
                await uploadBytes(upload, file);
                beerPicUrl = await getDownloadURL(upload);
                setBeerPhoto(beerPicUrl);
            }
        }catch (err){console.log("catch del error"+err)}

        console.log(beerPicUrl);
        console.log(storage);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let temp = style.split(',');
        const newPost = {
            username: user.username,
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
            beerPhoto,
            categories: temp,
        };

        try {
            const res = await axiosInstance.post("/posts", newPost);
            console.log(res);
            e.preventDefault();
            window.location.replace(HOME);
        } catch (err) {}

    };
    return (
        <div className="write">
            <div className="imageContainer">
                {file && (
                    <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
                )}
            </div>
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup init">
                    <div className="icons">
                        <label htmlFor="fileInput">
                            <i className="writeIcon fas fa-plus"></i>
                        </label>
                        <label htmlFor="fileUpload">
                            <i className="uploadIcon fa-solid fa-circle-chevron-up" onClick={handleUpload}></i>
                        </label>
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput title"
                        autoFocus={true}
                        onChange={e=>setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="writeFormGroup">
                  <textarea
                      placeholder="Notas"
                      type="text"
                      className="writeInput writeText"
                      onChange={e=>setDesc(e.target.value)}
                      required
                  />
                </div>
                <div className="writeFormGroup a">
                    <input
                        type="text"
                        placeholder="OG"
                        id="ogInput"
                        className="ogInput"
                        onChange={e=>setOriginalGravity(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="FG"
                        id="fgInput"
                        className="fgInput"
                        onChange={e=>setFinalGravity(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Mash Temp"
                        id="mTempInput"
                        className="mTempInput"
                        onChange={e=>setMashTemp(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Mash Time"
                        id="mTimeInput"
                        className="mTimeInput"
                        onChange={e=>setMashTime(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Boil time"
                        id="btInput"
                        className="btInput"
                        onChange={e=>setBoilTime(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="style"
                        id="style"
                        className="styleInput"
                        onChange={e=>setStyle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup b">
                    <textarea
                        type="text"
                        placeholder="Malts"
                        id="maltsInput"
                        className="maltsInput"
                        onChange={e=>setMalts(e.target.value)}
                    />
                    <textarea
                        type="text"
                        placeholder="hops"
                        id="hopsInput"
                        className="hopsInput"
                        onChange={e=>setHops(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup c">
                    <textarea
                        type="text"
                        placeholder="Other aggregates"
                        id="aggsInput"
                        className="aggsInput"
                        onChange={e=>setOtherAggregates(e.target.value)}
                    />
                    <textarea
                        type="text"
                        placeholder="Water profile"
                        id="waterProfileInput"
                        className="waterProfileInput"
                        onChange={e=>setWaterProfile(e.target.value)}
                    />
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
}