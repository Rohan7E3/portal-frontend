import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeHeader from "../components/HomeHeader";
import api from '../api';
import PasswordChangeBox from "../components/PasswordChangeBox";
import '../styles/Resources.css';
import AddStudent from "../components/AddStudent";

function Resources() {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => { 
        getUserInfo();
    }, [])

    const getUserInfo = () => {
        api.get("/api/user-status/").then((res) => res.data).then((data) => {
            setUserInfo(data);
            console.log("main", data);
        }).catch((error) => alert(error));
    }

    return(
        <div className="resource-styles">
            <div>
                <Navbar userInfo={userInfo}/>
                <HomeHeader userInfo={userInfo}/>
            </div>
            <div className="content">
                <h2>Select Action to Perform:</h2>
                <br/>
                <div className="boxes">
                    <PasswordChangeBox/>
                    {userInfo.is_staff === true ? <AddStudent userInfo={userInfo}/> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Resources