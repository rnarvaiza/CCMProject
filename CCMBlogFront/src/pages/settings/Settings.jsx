import React, {useContext, useState} from 'react';
import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar";
import {UNKNOWN_USER} from "../../assets/Assets";
import {Context} from "../../context/Context";
import axios from "axios";
import {USERS} from "../../config/routes/Paths";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../firebase";

function Settings() {
    const {user, dispatch, isFetching} = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUserName] = useState("");
    const [username2, setUserName2] = useState("");
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [uploaded, setUploaded] = useState(0);
    const [success, setSuccess] = useState(false);
    const PF = "http://localhost:5000/images/";

    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL
    });


    const storage = getStorage(firebaseApp);    
/*
    const upload = async (item) =>{
        const uploadTask = ref(storage, `/items/${item.file.name}`);
        await uploadBytes(uploadTask, item);
        setProfilePic(await getDownloadURL(uploadTask));
    };*/

	const handleSubmit = async (e) => {
	        let profilePicUrl;
	        dispatch({type:"UPDATE_START"});

	        const updatedUser = {
	            userId: user._id,
	            username,
	            email,
	            password,
	        };
	        if (file){
	            const upload = ref(storage, `/items/${file.name}`);
	            await uploadBytes(upload, file);
	            profilePicUrl= await getDownloadURL(upload);
	            updatedUser.profilePic = profilePicUrl;
		}

	        console.log(updatedUser);
            if(!username){
                setUserName2(user.username);
                console.log(username2);
                console.log(user.username);
                console.log(username);
            }
            if(!email){
                setMail(user.email);
            }
            if(!password){
                setPassword(user.password);
            }
	        if(username && email && password){
	            try {
	                const res = await axiosInstance.put(USERS+user._id, {
			            "userId": user._id,
	                    "profilePic":profilePicUrl,
                        "email":email,
                        "password":password,
	                });
                    console.log(res);
	                setSuccess(true);
	                dispatch({type:"UPDATE_SUCCESS", payload: res.data});
	            } catch (err) {
			dispatch({type:"UPDATE_FAILURE"});
            isFetching(false);
			console.log(err);
			}
			e.preventDefault();
	        }
	    };

    const handleDelete = async() =>{
        try{
            const res = await axiosInstance.delete(USERS+user._id, {data:{userId: user._id},});
            console.log(res);
	    dispatch({type:"LOGOUT"});
        }catch (err){console.log(err)}
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle"></span>
                    <button className="settingsDeleteTitle c" onClick={handleDelete}>Delete</button>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : (user.profilePic?user.profilePic:UNKNOWN_USER)}/>
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{display:"none"}}
                            onChange={(e) => setFile(e.target.files[0])}
                            //required
                        />
                    </div>
                    <label>username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUserName(e.target.value)}
                        //disabled="true"
                        required
                    />
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={(e) => setMail(e.target.value)}
                        //disabled="true"
                        required
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        //disabled="true"
                        required
                    />
                    <button className="settingsSubmit d" type="submit">Update</button>
                    {success && <span style={{color: "green", textAlign:"center", marginTop:"20px"}}>Profile has been updated</span>}
                </form>
            </div>
            <Sidebar/>
        </div>
    );
}

export default Settings;
